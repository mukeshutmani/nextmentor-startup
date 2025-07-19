import FaqAccordion from "@/components/FaqAccordion";
import HeroSection from "@/components/HeroSection";
import MentorConnectSection from "@/components/MentorConnectSection";
import TestimonialsWall from "@/components/Testinomials";
import TopMentorsCarousel from "@/components/TopMentorsCarousel";
import TrustedBy from "@/components/TrustedBy";
import WhyChoseSection from "@/components/WhyChoseSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <WhyChoseSection />
      <TopMentorsCarousel />
      <MentorConnectSection />
      <TestimonialsWall />
      <FaqAccordion />
    </main>
  );
}
