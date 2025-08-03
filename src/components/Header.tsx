import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Logo and Tagline Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          {/* Logo and Tagline */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <img 
                src="/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png" 
                alt="Ushanita Foundation Logo" 
                className="h-32 w-auto bg-white p-3 rounded-lg shadow-md border-2 border-ngo-purple"
              />
            </div>
            
            {/* Tagline with colored text */}
            <div className="text-center lg:text-left">
              <h1 className="text-xl md:text-2xl font-bold mb-2">
                <span className="text-ngo-red">Light of </span>
                <span className="text-ngo-green">Love </span>
                <span className="text-ngo-blue">and compassion</span>
              </h1>
              <p className="text-base md:text-lg text-ngo-blue italic font-medium">
                A dream to make dreams come true
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden lg:block">
          <div className="bg-gradient-to-r from-ngo-purple to-ngo-compassion rounded-lg px-2 py-2">
            <div className="flex justify-center space-x-1">
              <button
                onClick={() => scrollToSection('home')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md transition-colors font-medium flex-1 text-center"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md transition-colors font-medium flex-1 text-center"
              >
                About us
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md transition-colors font-medium flex-1 text-center"
              >
                What we do
              </button>
              <button
                onClick={() => scrollToSection('donate')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md transition-colors font-medium flex-1 text-center"
              >
                Donation
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md transition-colors font-medium flex-1 text-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="bg-gradient-to-r from-ngo-purple to-ngo-compassion rounded-lg p-2">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => scrollToSection('home')}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-md transition-colors font-medium text-center"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-md transition-colors font-medium text-center"
                >
                  About us
                </button>
                <button
                  onClick={() => scrollToSection('programs')}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-md transition-colors font-medium text-center"
                >
                  What we do
                </button>
                <button
                  onClick={() => scrollToSection('donate')}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-md transition-colors font-medium text-center"
                >
                  Donation
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-md transition-colors font-medium text-center"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;