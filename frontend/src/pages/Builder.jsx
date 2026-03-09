import React from 'react';
import Header from '../components/Header';
import ResumeBuilder from '../components/ResumeBuilder';

export default function Builder() {
    return (
        <div className="h-screen w-full bg-white text-brand-dark overflow-hidden flex flex-col">
            {/* Keeping the global header, but might want a simplified version here later */}
            <Header />

            <main className="flex-1 w-full bg-grid overflow-hidden relative">
                <ResumeBuilder />
            </main>
        </div>
    );
}
