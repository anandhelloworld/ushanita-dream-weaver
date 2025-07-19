import { User } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Prem Babu",
      role: "Founder & Chairman",
      description: "Visionary leader dedicated to serving humanity and bringing positive change to communities."
    },
    {
      name: "Navin",
      role: "Program Director",
      description: "Experienced in program management and community outreach, ensuring effective implementation of our initiatives."
    },
    {
      name: "Anand",
      role: "Operations Manager",
      description: "Skilled in operations management and resource coordination, optimizing our impact across all programs."
    }
  ];

  return (
    <section id="team" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Core Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated individuals who lead our mission and drive positive change in our communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className="bg-card rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={32} className="text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                {member.name}
              </h3>
              
              <h4 className="text-lg font-semibold text-primary mb-4">
                {member.role}
              </h4>
              
              <p className="text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Join Our Team
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision of serving humanity. 
            Together, we can create a greater impact.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;