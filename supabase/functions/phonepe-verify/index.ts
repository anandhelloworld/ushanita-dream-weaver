import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { transactionId } = await req.json()

    if (!transactionId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Transaction ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // PhonePe API credentials
    const merchantId = Deno.env.get('PHONEPE_MERCHANT_ID') || 'MERCHANTUAT'
    const saltKey = Deno.env.get('PHONEPE_SALT_KEY') || 'your-salt-key'
    const keyIndex = 1

    // Create checksum for verification
    const checksumString = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey
    const checksum = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(checksumString))
    const checksumHex = Array.from(new Uint8Array(checksum))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('') + '###' + keyIndex

    // Verify payment status with PhonePe
    const phonePeResponse = await fetch(
      `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksumHex,
          'X-MERCHANT-ID': merchantId,
        }
      }
    )

    const phonePeData = await phonePeResponse.json()

    // Update transaction status in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const status = phonePeData.success && phonePeData.data?.state === 'COMPLETED' ? 'SUCCESS' : 'FAILED'
    
    await supabase
      .from('donations')
      .update({
        status: status,
        phonepe_response: phonePeData,
        updated_at: new Date().toISOString()
      })
      .eq('transaction_id', transactionId)

    return new Response(
      JSON.stringify({
        success: phonePeData.success,
        status: status,
        data: phonePeData.data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in phonepe-verify function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})