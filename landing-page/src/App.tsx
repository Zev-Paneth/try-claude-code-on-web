import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Showcase } from './components/Showcase';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ParticlesBackground } from './components/ParticlesBackground';

function App() {
  return (
    <div className="relative">
      <ParticlesBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main>
        <div id="home">
          <Hero />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="work">
          <Showcase />
        </div>

        <div id="testimonials">
          <Testimonials />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
