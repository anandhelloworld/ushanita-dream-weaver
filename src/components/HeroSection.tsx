import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-background to-secondary pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Banner Image - prominent display */}
        <div className="flex justify-center mb-8">
          <div className="relative max-w-5xl w-full">
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