import { Heart, Shield, GraduationCap, UtensilsCrossed, CreditCard, Smartphone, Building } from 'lucide-react';

const DonateSection = () => {
  const donationMethods = [
    {
      icon: CreditCard,
      title: "Online Donation",
      description: "Secure online payments through our website"
    },
    {
      icon: Building,
      title: "Bank Transfer",
      description: "Direct bank transfer to our foundation account"
    },
    {
      icon: Smartphone,
      title: "Mobile Payment",
      description: "Quick donations via mobile payment apps"
    }
  ];

  const impactAreas = [
    {
      icon: Heart,
      title: "JIWAN - Medical Care",
      description: "₹500 can provide basic medical consultation for 5 patients",
      color: "ngo-red"
    },
    {
      icon: Shield,
      title: "Swabhiman - Dignity Support",
      description: "₹1000 can support elderly care for one month",
      color: "ngo-blue"
    },
    {
      icon: GraduationCap,
      title: "Atmanirbhar - Education",
      description: "₹300 can provide educational materials for one child",
      color: "ngo-green"
    },
    {
      icon: UtensilsCrossed,
      title: "No Pain of Hunger",
      description: "₹100 can provide nutritious meals for 10 people",
      color: "ngo-yellow"
    }
  ];

  return (
    <section id="donate" className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Make a Difference Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your contribution can transform lives and bring hope to those in need. 
            Every donation, no matter the size, creates a ripple effect of positive change.
          </p>
        </div>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactAreas.map((area, index) => (
            <div 
              key={area.title}
              className="bg-card rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 bg-${area.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <area.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {area.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {/* Donation Methods */}
        <div className="bg-card rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Ways to Donate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donationMethods.map((method, index) => (
              <div key={method.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {method.title}
                </h4>
                <p className="text-muted-foreground">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h3>
          <p className="text-white/90 mb-6 text-lg">
            Join thousands of supporters who are helping us create positive change in our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Donate Now
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;