import React from 'react';

export default function Showcase() {
    const cards = [
        {
            name: 'Sarah Chen',
            role: 'PRODUCT DESIGNER',
            initials: 'SC',
            color: 'bg-brand-pink',
            textColor: 'text-brand-pink',
        },
        {
            name: 'Alex Rivera',
            role: 'SOFTWARE ENGINEER',
            initials: 'AR',
            color: 'bg-brand-blue',
            textColor: 'text-brand-blue',
        },
        {
            name: 'Jordan Taylor',
            role: 'MARKETING LEAD',
            initials: 'JT',
            color: 'bg-brand-dark',
            textColor: 'text-brand-dark',
        }
    ];

    return (
        <section id="examples" className="w-full py-24 bg-white relative">
            <div className="max-w-6xl mx-auto px-4 text-center mb-16 relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 font-mono-title tracking-tight">
                    Built for <span className="text-brand-pink font-sans">everyone</span>
                </h2>
                <p className="font-mono text-sm md:text-md text-gray-500 max-w-xl mx-auto uppercase tracking-wider">
                    From developers to designers to marketers.
                    <br />Your profession, your style.
                </p>

                {/* Star */}
                <svg className="absolute right-0 md:right-32 top-0 w-16 h-16 text-purple-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {cards.map((card, idx) => (
                        <div key={idx} className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-dark)] transition-transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--color-brand-dark)] flex flex-col group cursor-pointer">

                            {/* Inner Colored Box Area */}
                            <div className="p-3 border-b-2 border-brand-dark">
                                <div className={`${card.color} h-64 md:h-80 w-full relative flex flex-col items-center justify-center border-2 border-brand-dark`}>

                                    {/* Tech/Camera corners */}
                                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50"></div>
                                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/50"></div>
                                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/50"></div>
                                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50"></div>

                                    {/* Center identity pill */}
                                    <div className="bg-white w-16 h-16 flex items-center justify-center text-brand-dark font-mono-title font-bold text-xl mb-4 border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-dark)] group-hover:scale-110 transition-transform">
                                        {card.initials}
                                    </div>

                                    {/* Fake UI lines */}
                                    <div className="w-16 h-2 bg-white/50 mb-2"></div>
                                    <div className="w-10 h-2 bg-white/30"></div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-6 bg-white">
                                <h3 className="font-mono-title font-bold text-xl md:text-2xl mb-1">{card.name}</h3>
                                <p className="font-mono text-xs text-gray-500 tracking-wider uppercase">{card.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
