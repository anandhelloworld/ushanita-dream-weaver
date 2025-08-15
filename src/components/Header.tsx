import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string>('');

  useEffect(() => {
    const processLogo = async () => {
      try {
        // Load the original logo
        const response = await fetch('/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png');
        const blob = await response.blob();
        const imageElement = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        const url = URL.createObjectURL(processedBlob);
        setProcessedLogoUrl(url);
      } catch (error) {
        console.error('Failed to process logo:', error);
        // Fallback to original image
        setProcessedLogoUrl('/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png');
      }
    };

    processLogo();
  }, []);

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
        {/* Logo and Tagline Row - Logo centered with text on both sides */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between items-center mb-8 gap-8">
          {/* Left side text - "Light of Love and compassion" in 2 lines */}
          <div className="text-center lg:text-right flex-1 order-2 lg:order-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              <div className="text-ngo-red">Light of Love</div>
              <div className="text-ngo-blue">and compassion</div>
            </h1>
          </div>
          
          {/* Logo - Center */}
          <div className="flex justify-center order-1 lg:order-2">
            <img 
              src={processedLogoUrl || '/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png'}
              alt="Ushanita Foundation Logo" 
              className="h-24 md:h-32 lg:h-40 w-auto p-2 rounded-lg"
            />
          </div>
          
          {/* Right side text - "A dream to make dreams come true" in 2 lines */}
          <div className="text-center lg:text-left flex-1 order-3">
            <p className="text-lg md:text-xl lg:text-2xl text-ngo-green italic font-medium leading-tight">
              <div>A dream to make</div>
              <div>dreams come true</div>
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