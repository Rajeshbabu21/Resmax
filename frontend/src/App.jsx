import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Builder from './pages/Builder';
import ATSAnalysis from './pages/ATSAnalysis';
import Templates from './pages/Templates';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative w-full flex flex-col items-center bg-white text-brand-dark bg-grid overflow-x-hidden">
        <div className="w-full max-w-[100vw]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/ats" element={<ATSAnalysis />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
