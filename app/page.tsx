import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import AICapabilities from "@/components/sections/AICapabilities";
import Benefits from "@/components/sections/Benefits";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import LeadCTA from "@/components/sections/LeadCTA";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* <TrustedBy /> */}
        <Services />
        <HowItWorks />
        <AICapabilities />
        <Benefits />
        <Pricing />
        <Testimonials />
        <FAQ />
        <LeadCTA />
      </main>
      <Footer />
    </>
  );
}
