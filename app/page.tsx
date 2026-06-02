import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LullabySection from '@/components/LullabySection';
import CoachSection from '@/components/CoachSection';
import ParentDashboard from '@/components/ParentDashboard';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <LullabySection />
      <CoachSection />
      <ParentDashboard />
      <Pricing />
      <Footer />
    </main>
  );
}
