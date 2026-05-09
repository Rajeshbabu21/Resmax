import React, { useState } from 'react';
import AnalysisInput from './AnalysisInput';
import AnalysisResults from './AnalysisResults';
import { apiRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function ATSAnalysisContainer() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    if (!token) {
        return (
            <div className="flex flex-col h-[calc(100vh-76px)] md:mt-[76px] mt-[72px] items-center justify-center p-4">
                <div className="bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-pink)] p-8 max-w-lg text-center">
                    <h2 className="font-mono-title text-2xl font-bold uppercase mb-4 text-brand-dark">Authentication Required</h2>
                    <p className="font-mono text-brand-dark/70 mb-6">Please sign in to analyze your resumes and track your ATS scores.</p>
                    <Button onClick={() => navigate('/signin')} className="w-full">
                        GO TO SIGN IN
                    </Button>
                </div>
            </div>
        );
    }

    const handleAnalyze = async (formData) => {
        setIsAnalyzing(true);
        setError(null);
        
        try {
            // Because apiRequest uses fetch and we're sending FormData,
            // we should let the browser set the Content-Type with boundary automatically.
            // If apiRequest overrides headers incorrectly, we might need a direct fetch.
            // Assuming apiRequest handles FormData well (if we don't pass Content-Type).
            const data = await apiRequest('/analyze_resume', {
                method: 'POST',
                body: formData,
            });
            
            setResults(data);
            setShowResults(true);
        } catch (err) {
            console.error("Analysis Failed:", err);
            setError(err.message || "Failed to analyze resume. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setShowResults(false);
        setResults(null);
        setError(null);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-76px)] md:mt-[76px] mt-[72px]">
            {/* Action Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-brand-light border-b-2 border-brand-dark z-10 shrink-0">
                <h1 className="font-mono-title font-bold text-xl uppercase tracking-widest text-brand-dark">Resumax <span className="text-brand-pink">ATS Analyzer</span></h1>
            </div>

            {/* Application Layout */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">

                {/* Loader Overlay */}
                {isAnalyzing && (
                    <div className="absolute inset-0 z-50 bg-brand-light/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-blue)] p-8 flex flex-col items-center max-w-sm text-center">
                            <div className="w-16 h-16 border-8 border-brand-dark/20 border-t-brand-blue rounded-full animate-spin mb-4"></div>
                            <h2 className="font-mono-title text-xl font-bold uppercase tracking-widest animate-pulse mb-2">Analyzing Resume...</h2>
                            <p className="font-mono text-sm text-brand-dark/70">Our AI is parsing your resume and matching it against the job details. This might take up to a minute.</p>
                        </div>
                    </div>
                )}

                {/* Error Overlay */}
                {error && !isAnalyzing && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-brand-pink text-white font-mono text-sm font-bold px-6 py-3 border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-dark)] flex items-center gap-4">
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="underline hover:text-brand-dark">Dismiss</button>
                    </div>
                )}

                {/* Input Pane */}
                <div className={`w-full ${showResults ? 'lg:w-1/2 lg:border-r-2 lg:block hidden' : 'lg:max-w-5xl mx-auto lg:border-r-0'} p-4 md:p-8 bg-brand-light/50 border-brand-dark overflow-hidden transition-all duration-300`}>
                    <div className="h-full max-h-full">
                        <AnalysisInput onAnalyze={handleAnalyze} />
                    </div>
                </div>

                {/* Results Pane */}
                {showResults && results && (
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
