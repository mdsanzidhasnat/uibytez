import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
// TODO: Re-enable this section once real client testimonials are collected.
// import { Testimonials } from "@/components/testimonials";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      {/* TODO: Re-enable this section once real client testimonials are collected. */}
      {/* <Testimonials /> */}
      <CtaSection />
    </>
  );
}
