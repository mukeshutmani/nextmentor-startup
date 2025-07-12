import HeroSection from "@/components/HeroSection";
import MentorConnectSection from "@/components/MentorConnectSection";
import TopMentors from "@/components/TopMentors";
import TrustedBy from "@/components/TrustedBy";
import WhyChoseSection from "@/components/WhyChoseSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <WhyChoseSection />
      <MentorConnectSection />
      <TopMentors />
      
    </main>
  );
}
