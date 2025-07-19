import { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect with Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get in touch to learn more about our programs, volunteer opportunities, 
            or to discuss how you can support our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Registered Office</h4>
                  <p className="text-muted-foreground">
                    123 Compassion Street<br />
                    Humanity Lane, Service City<br />
                    PIN: 123456, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Email</h4>
                  <p className="text-muted-foreground">
                    info@ushanitafoundation.org<br />
                    support@ushanitafoundation.org
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-ngo-green rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Phone</h4>
                  <p className="text-muted-foreground">
                    +91 98765 43210<br />
                    +91 87654 32109
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-card rounded-lg">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Corporate Information
              </h4>
              <p className="text-muted-foreground">
                <strong>CIN:</strong> U85300DL2024NPL123456<br />
                <strong>Registration:</strong> Registered under Section 8 of Companies Act, 2013
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                  placeholder="Tell us how you'd like to get involved or any questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;