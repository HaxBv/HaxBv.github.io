import { About } from '../components/home/About';
import { Contact } from '../components/home/Contact';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { Hero } from '../components/home/Hero';
import { Skills } from '../components/home/Skills';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
