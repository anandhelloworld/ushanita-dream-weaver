import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProgramsSection from '@/components/ProgramsSection';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import DonateSection from '@/components/DonateSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProgramsSection />
      <AboutSection />
      <TeamSection />
      <DonateSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
