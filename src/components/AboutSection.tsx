import { Users, Target, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Ushanita Foundation
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Ushanita Foundation envisions a world where unity and compassion drive national service, 
                bringing hope and light to those living in darkness. We believe in the power of collective 
                action to transform lives and communities.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to unite people from all walks of life in service to humanity, 
                ensuring that no one is left behind in our journey towards a more equitable and 
                compassionate society.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Unity in Service</h4>
                  <p className="text-muted-foreground">
                    Bringing together people from diverse backgrounds to serve our community with one heart and one purpose.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Focused Impact</h4>
                  <p className="text-muted-foreground">
                    Addressing core human needs through targeted programs that create lasting positive change.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-ngo-compassion rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Compassionate Care</h4>
                  <p className="text-muted-foreground">
                    Approaching every individual with love, respect, and dignity, ensuring their fundamental rights are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Join Our Mission
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Together, we can illuminate the path for those in need and make dreams come true. 
              Every act of service, no matter how small, contributes to our collective impact.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;