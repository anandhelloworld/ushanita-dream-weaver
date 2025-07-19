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
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png" 
              alt="Ushanita Foundation Logo" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About us
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              What we do
            </button>
            <button
              onClick={() => scrollToSection('donate')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Donation
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                About us
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                What we do
              </button>
              <button
                onClick={() => scrollToSection('donate')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Donation
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Contact Us
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;