import React from 'react';

export default function Steps() {
    const steps = [
        {
            title: 'Upload',
            desc: 'Drop your resume. Any format.',
        },
        {
            title: 'Generate',
            desc: 'AI builds your portfolio.',
        },
        {
            title: 'Publish',
            desc: 'Go live instantly.',
        }
    ];

    return (
        <section id="how-it-works" className="w-full max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-b-2 border-l-2 border-brand-dark bg-white">
                {steps.map((step, idx) => (
                    <div key={idx} className="border-r-2 border-b-2 md:border-b-0 border-brand-dark p-8 md:p-12 hover:bg-gray-50 transition-colors">
                        <h3 className="font-mono-title text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                        <p className="font-mono text-sm text-gray-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
