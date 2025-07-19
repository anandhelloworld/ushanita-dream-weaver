import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-12">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/1958cbfd-8690-4d3d-80db-ddcd171dded1.png" 
              alt="Ushanita Foundation Logo" 
              className="h-32 w-auto"
            />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Light of Love and compassion
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground italic">
            A dream to make dreams true
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="flex justify-center mb-8">
          <div className="relative max-w-4xl w-full">
            <img 
              src={heroBanner}
              alt="Ushanita Foundation - Serving humanity through various programs"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Bringing Hope to Those in Need
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join us in our mission to serve humanity through medical assistance, 
            dignity support, education, and food security programs. Together, we can make dreams come true.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Donate Now
            </button>
            <button 
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;