import { Heart, Shield, GraduationCap, UtensilsCrossed } from 'lucide-react';
import jiwanImage from '@/assets/jiwan-medical.jpg';
import swabhimanImage from '@/assets/swabhiman-dignity.jpg';
import atmanirbharImage from '@/assets/atmanirbhar-education.jpg';
import foodImage from '@/assets/food-program.jpg';

const ProgramsSection = () => {
  const programs = [
    {
      title: "JIWAN",
      subtitle: "Medical Assistance & Care",
      description: "Providing essential medical assistance and healthcare services to those in need. Our JIWAN program ensures that quality healthcare reaches the underprivileged, offering medical consultations, treatments, and emergency care to build healthier communities.",
      icon: Heart,
      image: jiwanImage,
      color: "ngo-red"
    },
    {
      title: "Swabhiman",
      subtitle: "Living with Dignity",
      description: "Supporting the elderly, orphans, handicapped, and underprivileged to live with dignity and respect. Our Swabhiman program provides shelter, care, and support services that ensure every individual can maintain their self-respect and live a meaningful life.",
      icon: Shield,
      image: swabhimanImage,
      color: "ngo-blue"
    },
    {
      title: "Atmanirbhar",
      subtitle: "Education & Livelihood",
      description: "Offering free education to children and livelihood support to adults. Our Atmanirbhar program focuses on empowerment through education and skill development, helping individuals become self-reliant and contributing members of society.",
      icon: GraduationCap,
      image: atmanirbharImage,
      color: "ngo-green"
    },
    {
      title: "No Pain of Hunger",
      subtitle: "Food Security",
      description: "Providing free meals to the needy and ensuring food security for vulnerable communities. Our hunger relief program operates community kitchens and food distribution centers to ensure no one goes to bed hungry.",
      icon: UtensilsCrossed,
      image: foodImage,
      color: "ngo-yellow"
    }
  ];

  return (
    <section id="programs" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our four core programs are designed to address the fundamental needs of our community, 
            ensuring comprehensive support for all aspects of human dignity and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div 
              key={program.title}
              className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${program.color} text-white mb-2`}>
                    <program.icon size={24} />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {program.title}
                </h3>
                <h4 className={`text-lg font-semibold text-${program.color} mb-4`}>
                  {program.subtitle}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;