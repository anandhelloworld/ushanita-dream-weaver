import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, QrCode, Heart, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { phonePeService } from '@/services/phonepe';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'qr'>('phonepe');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = ['500', '1000', '2500', '5000'];

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handleDonate = async () => {
    const finalAmount = amount || customAmount;
    if (!finalAmount) {
      toast({
        title: "Amount Required",
        description: "Please select or enter a donation amount.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'phonepe') {
        const result = await phonePeService.initiatePayment({
          amount: parseFloat(finalAmount),
          isRecurring: donationType === 'monthly',
          purpose: `${donationType} donation to Ushanita Foundation`
        });
        
        if (result.success && result.redirectUrl) {
          // Redirect to PhonePe payment page
          window.location.href = result.redirectUrl;
        } else {
          throw new Error(result.message || 'Payment initiation failed');
        }
      } else {
        // QR code payment - show success message
        toast({
          title: "QR Code Payment",
          description: `Please scan the QR code to complete your donation of ₹${finalAmount}. After payment, email the screenshot to donations@ushanitafoundation.org`,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-ngo-purple">
            <Heart className="h-6 w-6" />
            Make a Donation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Donation Type */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Donation Type</Label>
            <RadioGroup value={donationType} onValueChange={(value: 'one-time' | 'monthly') => setDonationType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time">One-time Donation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly Donation</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Amount Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Amount (₹)</Label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {predefinedAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant={amount === amt ? "default" : "outline"}
                  onClick={() => handleAmountSelect(amt)}
                  className="h-12"
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
            <Input
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmount(e.target.value)}
              type="number"
            />
          </div>

          {/* Payment Method */}
          <Tabs value={paymentMethod} onValueChange={(value: 'phonepe' | 'qr') => setPaymentMethod(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phonepe" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                PhonePe
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="phonepe" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">PhonePe Payment Gateway</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {donationType === 'monthly' 
                      ? 'Set up a monthly recurring donation through PhonePe\'s secure payment gateway.' 
                      : 'You will be redirected to PhonePe\'s secure payment gateway to complete your donation.'
                    }
                  </p>
                  <Button 
                    onClick={handleDonate} 
                    className="w-full bg-ngo-purple hover:bg-ngo-purple/90"
                    disabled={(!amount && !customAmount) || isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Donate ₹${amount || customAmount || '0'} via PhonePe`}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qr" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Scan QR Code</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-white p-4 rounded-lg mb-4 border">
                    <img 
                      src="/lovable-uploads/cdca3f41-c37f-43ea-9676-006107d69dc9.png" 
                      alt="Ushanita Foundation QR Code for UPI Payment" 
                      className="w-full max-w-xs mx-auto"
                    />
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>UPI ID:</strong> UshanitaFoundation@iob</p>
                    <p><strong>Amount:</strong> ₹{amount || customAmount || '0'}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    After payment, please email the transaction screenshot to donations@ushanitafoundation.org
                  </p>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "QR Code Payment",
                        description: "Please scan the QR code and complete your payment. Thank you for your donation!",
                      });
                      onClose();
                    }} 
                    className="w-full mt-4 bg-ngo-purple hover:bg-ngo-purple/90"
                    disabled={!amount && !customAmount}
                  >
                    I've Completed the Payment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;