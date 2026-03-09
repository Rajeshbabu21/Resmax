import React from 'react';
import Button from '../ui/Button';

export default function AnalysisResults({ results, onReset }) {

    // Determine color based on score
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-brand-green';
        if (score >= 60) return 'text-brand-yellow';
        return 'text-brand-pink';
    };

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">

            {/* Top Bar with Reset */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-mono-title text-2xl font-bold uppercase tracking-widest">Analysis Results</h2>
                <Button variant="outline" onClick={onReset} className="text-xs py-1.5 px-3">
                    New Analysis
                </Button>
            </div>

            {/* Score Overview */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-dark)] p-8 flex flex-col md:flex-row items-center gap-8">
                {/* Score Gauge Mockup */}
                <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center border-8 border-brand-dark rounded-full bg-brand-light">
                    <div className={`text-5xl font-bold font-mono tracking-tighter ${getScoreColor(results.score)}`}>
                        {results.score}
                    </div>
                    <div className="absolute -bottom-2 bg-brand-dark text-white px-3 py-1 text-xs font-mono font-bold uppercase">
                        ATS SCORE
                    </div>
                </div>

                {/* Summary */}
                <div>
                    <h3 className="font-bold text-xl mb-2 font-mono-title uppercase">Summary</h3>
                    <p className="font-body text-gray-700 leading-relaxed border-l-4 border-brand-blue pl-4 py-1">
                        {results.summary}
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matched Keywords */}
                <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-green)] p-6">
                    <h3 className="font-bold text-lg mb-4 font-mono uppercase flex items-center gap-2">
                        <span className="w-3 h-3 bg-brand-green border border-brand-dark inline-block"></span>
                        Matched Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {results.matchedKeywords.map((kw, i) => (
                            <span key={i} className="px-2 py-1 bg-green-100 border border-brand-dark font-mono text-xs font-bold text-brand-dark">
                                {kw}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Missing Keywords */}
                <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] p-6">
                    <h3 className="font-bold text-lg mb-4 font-mono uppercase flex items-center gap-2">
                        <span className="w-3 h-3 bg-brand-pink border border-brand-dark inline-block"></span>
                        Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {results.missingKeywords.map((kw, i) => (
                            <span key={i} className="px-2 py-1 bg-red-100 border border-brand-dark font-mono text-xs font-bold text-brand-dark">
                                {kw}
                            </span>
                        ))}
                    </div>
                </section>
            </div>

            {/* Recommendations */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-yellow)] p-6">
                <h3 className="font-bold text-lg mb-4 font-mono uppercase border-b-2 border-brand-dark pb-2">Recommendations</h3>
                <ul className="space-y-4">
                    {results.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-3 font-body">
                            <span className="font-mono font-bold text-brand-yellow shrink-0">{(i + 1).toString().padStart(2, '0')}.</span>
                            <span className="text-gray-800">{rec}</span>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
}
