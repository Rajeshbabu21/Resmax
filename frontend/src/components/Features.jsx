import React from 'react';
import { Bot, LineChart, CheckCircle, FileText, Target, Download } from 'lucide-react';

export default function Features() {
    const features = [
        { icon: <Bot size={24} />, title: 'AI Generation', desc: 'Writes your achievements for you.' },
        { icon: <LineChart size={24} />, title: 'ATS Scoring', desc: 'Match keywords & skills instantly.' },
        { icon: <CheckCircle size={24} />, title: 'Grammar Pro', desc: 'Error-free writing guaranteed.' },
        { icon: <FileText size={24} />, title: 'Format Check', desc: 'Parses perfectly on all systems.' },
        { icon: <Target size={24} />, title: 'Job Tailored', desc: 'Adapt your resume to any role.' },
        { icon: <Download size={24} />, title: 'Easy Exports', desc: 'Unlimited PDF downloads.' }
    ];

    return (
        <section id="features" className="w-full py-24 bg-brand-dark text-white relative">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-mono-title text-4xl md:text-6xl font-bold mb-4">
                        Everything you <span className="text-brand-pink font-sans">need</span>
                    </h2>
                    <p className="font-mono text-sm md:text-base text-gray-400">
                        Powerful features without the complexity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white text-brand-dark p-6 border-2 border-brand-dark flex gap-4 items-start shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--color-brand-blue)] transition-all">
                            <div className="bg-brand-dark text-white p-2 border-2 border-brand-dark rounded-sm">
                                {f.icon}
                            </div>
                            <div>
                                <h4 className="font-mono-title font-bold text-lg mb-1">{f.title}</h4>
                                <p className="font-mono text-xs text-gray-600">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative star */}
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-10 right-10 opacity-20 text-brand-pink hidden md:block">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
            </svg>
        </section>
    );
}
