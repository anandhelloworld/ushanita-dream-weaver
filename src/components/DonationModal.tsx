import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, QrCode, Heart } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  const predefinedAmounts = ['500', '1000', '2500', '5000'];

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handleDonate = () => {
    const finalAmount = amount || customAmount;
    if (!finalAmount) return;

    // Here you would integrate with your payment processor
    console.log('Processing donation:', {
      type: donationType,
      amount: finalAmount,
      paymentMethod
    });
    
    // For now, just show success message
    alert(`Thank you for your ${donationType} donation of ₹${finalAmount}!`);
    onClose();
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
          <Tabs value={paymentMethod} onValueChange={(value: 'card' | 'qr') => setPaymentMethod(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card/UPI
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Online Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    You will be redirected to our secure payment gateway to complete your donation.
                  </p>
                  <Button 
                    onClick={handleDonate} 
                    className="w-full bg-ngo-purple hover:bg-ngo-purple/90"
                    disabled={!amount && !customAmount}
                  >
                    Donate ₹{amount || customAmount || '0'}
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
                  <div className="bg-gray-100 p-8 rounded-lg mb-4">
                    <QrCode className="h-32 w-32 mx-auto text-ngo-purple" />
                    <p className="text-sm text-muted-foreground mt-2">QR Code will appear here</p>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>UPI ID:</strong> ushanitafoundation@paytm</p>
                    <p><strong>Amount:</strong> ₹{amount || customAmount || '0'}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    After payment, please email the transaction screenshot to donations@ushanitafoundation.org
                  </p>
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