import React from 'react';
import Button from '../ui/Button';

export default function AnalysisResults({ results, onReset }) {

    // Determine color based on score
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-brand-green';
        if (score >= 60) return 'text-brand-yellow';
        return 'text-brand-pink';
    };
    
    const getProgressBarColor = (score) => {
        if (score >= 80) return 'bg-brand-green';
        if (score >= 60) return 'bg-brand-yellow';
        return 'bg-brand-pink';
    };

    const atsScore = results?.ats_score || 0;
    const keywords = results?.keywords || [];
    const missingKeywords = results?.missing_keywords || [];
    const feedbackData = results?.feedback || {};
    const feedbackText = feedbackData.feedback || "No feedback available.";

    const subScores = [
        { label: "Content Quality", score: feedbackData.content_quality || 0, max: 40 },
        { label: "ATS Structure", score: feedbackData.ats_structure || 0, max: 20 },
        { label: "Job Optimization", score: feedbackData.job_optimization || 0, max: 20 },
        { label: "Ready to Apply", score: feedbackData.ready_to_apply || 0, max: 10 },
        { label: "Writing Quality", score: feedbackData.writing_quality || 0, max: 10 },
    ];

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-4 pb-8 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">

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
                    <div className={`text-5xl font-bold font-mono tracking-tighter ${getScoreColor(atsScore)}`}>
                        {atsScore}
                    </div>
                    <div className="absolute -bottom-2 bg-brand-dark text-white px-3 py-1 text-xs font-mono font-bold uppercase">
                        ATS SCORE
                    </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="w-full flex-1">
                    <h3 className="font-bold text-lg mb-4 font-mono-title uppercase border-b-2 border-brand-dark pb-2">Score Breakdown</h3>
                    <div className="flex flex-col gap-3">
                        {subScores.map((item, idx) => {
                            // Calculate percentage for progress bar based on its specific max value (assuming max is 100 for color, but here they add up to 100)
                            const percentage = Math.min(100, Math.max(0, (item.score / item.max) * 100));
                            return (
                                <div key={idx} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs font-mono font-bold uppercase">
                                        <span>{item.label}</span>
                                        <span>{item.score}/{item.max}</span>
                                    </div>
                                    <div className="w-full h-3 bg-brand-light border border-brand-dark overflow-hidden">
                                        <div 
                                            className={`h-full ${getProgressBarColor(percentage)} border-r border-brand-dark transition-all duration-1000`} 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-6">
                <h3 className="font-bold text-xl mb-4 font-mono-title uppercase border-b-2 border-brand-dark pb-2">AI Feedback & Summary</h3>
                <div className="font-body text-gray-700 leading-relaxed space-y-4 text-sm md:text-base">
                    <ul className="list-disc pl-5 space-y-3 marker:text-brand-pink">
                        {feedbackText.split('\n').filter(line => line.trim().length > 0).map((line, idx) => {
                            // Clean up AI output dashes or asterisks if it naturally returned them as a list
                            const cleanLine = line.replace(/^[\s*-]+/, '').trim();
                            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
                            return (
                                <li key={idx} className="pl-1">
                                    {parts.map((part, i) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={i} className="text-brand-dark">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

        </div>
    );
}
