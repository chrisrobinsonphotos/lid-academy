import Nav from "@/components/Nav";
import IntroSection from "@/components/IntroSection";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reframe from "@/components/Reframe";
import CostSection from "@/components/CostSection";
import Observation from "@/components/Observation";
import Proof from "@/components/Proof";
import VideoSection from "@/components/VideoSection";
import Process from "@/components/Process";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import GrainOverlay from "@/components/GrainOverlay";

export default function Home() {
  return (
    <>
      <Cursor />
      <GrainOverlay />
      <Nav />
      <main>
        <IntroSection />
        <Hero />
        <Marquee />
        <Reframe />
        <CostSection />
        <Observation />
        <Proof />
        <VideoSection />
        <Process />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
