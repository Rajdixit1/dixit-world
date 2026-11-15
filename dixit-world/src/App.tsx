import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { SolutionExplorer } from './components/SolutionExplorer';
import { ConceptShowcase } from './components/ConceptShowcase';
import { Process } from './components/Process';
import { WhyDixitWorld } from './components/WhyDixitWorld';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <SolutionExplorer />
        <ConceptShowcase />
        <Process />
        <WhyDixitWorld />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
