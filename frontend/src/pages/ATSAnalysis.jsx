import React from 'react';
import Header from '../components/Header';
import ATSAnalysisContainer from '../components/ATSAnalysis';

export default function ATSAnalysis() {
    return (
        <div className="h-screen w-full bg-white text-brand-dark overflow-hidden flex flex-col">
            <Header />

            <main className="flex-1 w-full bg-grid overflow-hidden relative">
                <ATSAnalysisContainer />
            </main>
        </div>
    );
}
