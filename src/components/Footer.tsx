import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png" 
                alt="Ushanita Foundation Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-background/80 mb-4 leading-relaxed">
              Light of Love and compassion, A dream to make dreams true. 
              Ushanita Foundation is dedicated to uniting people for national service 
              and bringing hope to those in darkness.
            </p>
            <div className="flex items-center space-x-2 text-background/60">
              <Heart size={16} />
              <span className="text-sm">Serving humanity with compassion</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('programs')}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Our Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('team')}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('donate')}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Donate
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1 text-background/60" />
                <div className="text-sm text-background/80">
                  123 Compassion Street<br />
                  Humanity Lane, Service City<br />
                  PIN: 123456, India
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-background/60" />
                <span className="text-sm text-background/80">info@ushanitafoundation.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-background/60" />
                <span className="text-sm text-background/80">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm mb-4 md:mb-0">
              © 2024 Ushanita Foundation. All rights reserved.
            </p>
            <p className="text-background/60 text-sm">
              CIN: U85300DL2024NPL123456 | Registered under Section 8 of Companies Act, 2013
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;