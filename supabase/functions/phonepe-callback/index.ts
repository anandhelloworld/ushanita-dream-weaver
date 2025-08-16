import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // This endpoint receives callbacks from PhonePe after payment completion
    const formData = await req.formData()
    const response = formData.get('response')?.toString()

    if (!response) {
      return new Response('Invalid callback data', { status: 400 })
    }

    // Decode the base64 response
    const decodedResponse = JSON.parse(atob(response))
    const transactionId = decodedResponse.data?.merchantTransactionId

    if (!transactionId) {
      return new Response('Invalid transaction data', { status: 400 })
    }

    // Update transaction status in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const status = decodedResponse.success && decodedResponse.data?.state === 'COMPLETED' ? 'SUCCESS' : 'FAILED'
    
    await supabase
      .from('donations')
      .update({
        status: status,
        phonepe_response: decodedResponse,
        updated_at: new Date().toISOString()
      })
      .eq('transaction_id', transactionId)

    // For recurring payments, set up the next payment if successful
    if (status === 'SUCCESS') {
      const { data: donation } = await supabase
        .from('donations')
        .select('*')
        .eq('transaction_id', transactionId)
        .single()

      if (donation?.is_recurring) {
        // Schedule next payment (you can implement this logic based on your needs)
        console.log('Setting up recurring payment for:', transactionId)
      }
    }

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Error in phonepe-callback function:', error)
    return new Response('Internal server error', { status: 500 })
  }
})