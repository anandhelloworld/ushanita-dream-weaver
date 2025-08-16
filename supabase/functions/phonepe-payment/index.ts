import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  amount: number;
  isRecurring: boolean;
  purpose: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, isRecurring, purpose }: PaymentRequest = await req.json()

    // Validate input
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid amount' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Generate unique transaction ID
    const transactionId = `UF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // PhonePe API credentials (you'll need to set these as environment variables)
    const merchantId = Deno.env.get('PHONEPE_MERCHANT_ID') || 'MERCHANTUAT'
    const saltKey = Deno.env.get('PHONEPE_SALT_KEY') || 'your-salt-key'
    const keyIndex = 1

    // Prepare payment payload
    const paymentPayload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: 'USER_' + Date.now(),
      amount: amount * 100, // PhonePe expects amount in paise
      redirectUrl: `${req.headers.get('origin')}/payment/success?txnId=${transactionId}`,
      redirectMode: 'POST',
      callbackUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/phonepe-callback`,
      mobileNumber: '9999999999', // Optional - you can collect this from user
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    }

    // Create base64 encoded payload
    const base64Payload = btoa(JSON.stringify(paymentPayload))
    
    // Create checksum (X-VERIFY header)
    const checksumString = base64Payload + '/pg/v1/pay' + saltKey
    const checksum = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(checksumString))
    const checksumHex = Array.from(new Uint8Array(checksum))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('') + '###' + keyIndex

    // Make request to PhonePe
    const phonePeResponse = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksumHex,
      },
      body: JSON.stringify({
        request: base64Payload
      })
    })

    const phonePeData = await phonePeResponse.json()

    if (phonePeData.success && phonePeData.data?.instrumentResponse?.redirectInfo?.url) {
      // Store transaction in Supabase for tracking
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      await supabase
        .from('donations')
        .insert({
          transaction_id: transactionId,
          amount: amount,
          is_recurring: isRecurring,
          purpose: purpose,
          status: 'INITIATED',
          payment_method: 'phonepe',
          created_at: new Date().toISOString()
        })

      return new Response(
        JSON.stringify({
          success: true,
          redirectUrl: phonePeData.data.instrumentResponse.redirectInfo.url,
          transactionId: transactionId
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to initiate payment with PhonePe'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

  } catch (error) {
    console.error('Error in phonepe-payment function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})