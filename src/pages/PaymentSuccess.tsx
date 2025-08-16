import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { phonePeService } from '@/services/phonepe';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [transactionId, setTransactionId] = useState<string>('');

  useEffect(() => {
    const txnId = searchParams.get('txnId');
    
    if (!txnId) {
      setPaymentStatus('failed');
      return;
    }

    setTransactionId(txnId);
    
    // Verify payment status
    const verifyPayment = async () => {
      try {
        const result = await phonePeService.verifyPayment(txnId);
        setPaymentStatus(result.success && result.status === 'SUCCESS' ? 'success' : 'failed');
      } catch (error) {
        console.error('Payment verification failed:', error);
        setPaymentStatus('failed');
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ngo-purple/10 to-ngo-orange/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {paymentStatus === 'loading' && (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-ngo-purple" />
                Verifying Payment
              </>
            )}
            {paymentStatus === 'success' && (
              <>
                <CheckCircle className="h-6 w-6 text-green-600" />
                Payment Successful
              </>
            )}
            {paymentStatus === 'failed' && (
              <>
                <XCircle className="h-6 w-6 text-red-600" />
                Payment Failed
              </>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          {paymentStatus === 'loading' && (
            <p className="text-muted-foreground">
              Please wait while we verify your payment...
            </p>
          )}
          
          {paymentStatus === 'success' && (
            <>
              <p className="text-green-600 font-semibold">
                Thank you for your generous donation!
              </p>
              <p className="text-sm text-muted-foreground">
                Your payment has been processed successfully. You will receive a confirmation email shortly.
              </p>
              {transactionId && (
                <p className="text-xs text-muted-foreground">
                  Transaction ID: {transactionId}
                </p>
              )}
            </>
          )}
          
          {paymentStatus === 'failed' && (
            <>
              <p className="text-red-600 font-semibold">
                Payment could not be completed
              </p>
              <p className="text-sm text-muted-foreground">
                There was an issue processing your payment. Please try again or contact us for assistance.
              </p>
            </>
          )}
          
          <Button 
            onClick={handleReturnHome}
            className="w-full bg-ngo-purple hover:bg-ngo-purple/90"
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;