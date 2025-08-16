interface PhonePePaymentRequest {
  amount: number;
  isRecurring: boolean;
  purpose: string;
}

interface PhonePePaymentResponse {
  success: boolean;
  redirectUrl?: string;
  transactionId?: string;
  message?: string;
}

class PhonePeService {
  private baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

  async initiatePayment(request: PhonePePaymentRequest): Promise<PhonePePaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/phonepe-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PhonePe payment initiation failed:', error);
      return {
        success: false,
        message: 'Failed to initiate payment. Please try again.',
      };
    }
  }

  async verifyPayment(transactionId: string): Promise<{ success: boolean; status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/phonepe-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ transactionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('PhonePe payment verification failed:', error);
      return { success: false, status: 'FAILED' };
    }
  }
}

export const phonePeService = new PhonePeService();