import { InitScreen } from './components/ui/InitScreen';
import { HeroSection } from './components/ui/HeroSection';
import { InfrastructureSection } from './components/ui/InfrastructureSection';
import { OrbitalSection } from './components/ui/OrbitalSection';
import { IndustriesSection } from './components/ui/IndustriesSection';
import { MilestonesSection } from './components/ui/MilestonesSection';
import { ContactSection } from './components/ui/ContactSection';
import { SideNavigation } from './components/ui/SideNavigation';
import { MobileNavigation } from './components/ui/MobileNavigation';
import { LanguageTransition } from './components/ui/LanguageTransition';
import { LanguageProvider } from './context/LanguageContext';
import { useState } from 'react';

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="relative w-full bg-background-dark font-display text-slate-100 selection:bg-primary selection:text-background-dark">
      <LanguageTransition />
      <MobileNavigation />

      {/* CAPA 5: BOOT SEQUENCE */}
      {!bootComplete && <InitScreen onComplete={() => setBootComplete(true)} />}

      {/* CAPA 10: DOM / UI - Flex Column Simple */}
      <div className="relative z-20 w-full flex flex-col">
        <div id="hero-section">
          <HeroSection isStarted={bootComplete} />
        </div>
        <div id="orbital-section">
          <OrbitalSection />
        </div>
        <div id="industries-section">
          <IndustriesSection />
        </div>
        <div id="infrastructure-section">
          <InfrastructureSection />
        </div>
        <div id="milestones-section">
          <MilestonesSection />
        </div>
        <div id="contact-section">
          <ContactSection />
        </div>
      </div>

      {/* SIDEBAR NAVIGATION - MOVED TO END FOR Z-INDEX PRIORITY */}
      <SideNavigation />

      {/* GLOBAL OVERLAYS */}
      <div className="scanlines fixed inset-0 z-50 pointer-events-none opacity-5" />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
