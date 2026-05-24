import Hero from '@/components/Hero';
import About from '@/components/About';
import LinksHub from '@/components/LinksHub';
import Team from '@/components/Team';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <LinksHub />
      <Team />
      <Projects />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Newsletter />
    </>
  );
}
