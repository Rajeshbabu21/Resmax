import React, { useState } from 'react';
import AnalysisInput from './AnalysisInput';
import AnalysisResults from './AnalysisResults';
import { dummyAnalysisResult } from './DummyResults';

export default function ATSAnalysisContainer() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate an API call delay
        setTimeout(() => {
            setResults(dummyAnalysisResult);
            setShowResults(true);
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleReset = () => {
        setShowResults(false);
        setResults(null);
    };

    return (
        <div className="flex flex-col h-screen pt-[72px] md:pt-[76px]">
            {/* Action Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-brand-light border-b-2 border-brand-dark z-10 shrink-0">
                <h1 className="font-mono-title font-bold text-xl uppercase tracking-widest text-brand-dark">Resumax <span className="text-brand-pink">ATS Analyzer</span></h1>
            </div>

            {/* Application Layout */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">

                {/* Loader Overlay */}
                {isAnalyzing && (
                    <div className="absolute inset-0 z-50 bg-brand-light/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-blue)] p-8 flex flex-col items-center">
                            <div className="w-16 h-16 border-8 border-brand-dark/20 border-t-brand-blue rounded-full animate-spin mb-4"></div>
                            <h2 className="font-mono-title text-xl font-bold uppercase tracking-widest animate-pulse">Analyzing Resume...</h2>
                        </div>
                    </div>
                )}

                {/* Input Pane */}
                <div className={`w-full ${showResults ? 'lg:w-1/2 lg:border-r-2 lg:block hidden' : 'lg:w-1/2 mx-auto lg:border-r-0'} p-4 md:p-8 bg-brand-light/50 border-brand-dark overflow-hidden transition-all duration-300`}>
                    <div className="h-full max-h-full">
                        <AnalysisInput onAnalyze={handleAnalyze} />
                    </div>
                </div>

                {/* Results Pane */}
                {showResults && (
                    <div className="w-full lg:w-1/2 p-4 md:p-8 bg-gray-50 overflow-y-auto">
                        <div className="max-w-full h-full">
                            <AnalysisResults results={results} onReset={handleReset} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
