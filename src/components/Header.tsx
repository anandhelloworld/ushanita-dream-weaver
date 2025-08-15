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
      <div className="container mx-auto px-4 py-8">
        {/* Logo and Tagline Row - Centered Layout */}
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Logo - Much Larger for Text Visibility */}
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png" 
              alt="Ushanita Foundation Logo" 
              className="h-48 md:h-56 lg:h-64 w-auto bg-white p-6 rounded-lg shadow-lg border-4 border-ngo-purple"
            />
          </div>
          
          {/* Tagline with colored text - Two lines side by side */}
          <div className="text-center max-w-4xl">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="text-ngo-red">Light of </span>
                <span className="text-ngo-green">Love</span>
              </h1>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="text-ngo-blue">and compassion</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-ngo-blue italic font-medium mt-4">
              A dream to make dreams come true
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden absolute top-4 right-4 p-2 bg-white/10 rounded-md"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
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