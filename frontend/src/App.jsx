import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Steps from './components/Steps';
import Showcase from './components/Showcase';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-white text-brand-dark bg-grid">
      <Header />

      <main className="pt-24 md:pt-32 pb-0">
        <Hero />
        <Steps />
        <Showcase />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
