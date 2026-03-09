import React from 'react';
import { MoveRight } from 'lucide-react';

export default function CTA() {
    return (
        <section className="w-full py-32 bg-brand-blue relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute left-10 top-10 w-24 h-24 text-brand-dark/20 hidden md:block">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
            </div>
            <div className="absolute right-10 bottom-10 w-32 h-32 text-brand-dark/20 hidden md:block">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
            </div>
            <div className="absolute left-4 bottom-1/2 w-4 h-4 bg-brand-dark/20 hidden md:block"></div>
            <div className="absolute right-1/4 top-1/4 w-6 h-6 bg-brand-dark/20 hidden md:block"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-5xl md:text-7xl font-bold font-mono-title tracking-tight mb-8">
                    <span className="text-white">Ready to get</span>
                    <br />
                    <span className="text-brand-dark">hired?</span>
                </h2>

                <p className="text-brand-dark/80 font-mono text-sm md:text-base mb-10 max-w-lg mx-auto">
                    Start building your ATS-optimized resume today.
                </p>

                {/* <form className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto mb-6" onSubmit={e => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="flex-1 w-full border-2 border-brand-dark px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_var(--color-brand-dark)] transition-shadow"
                    />
                    <button
                        type="submit"
                        className="bg-brand-dark text-white font-mono font-bold uppercase tracking-widest text-sm px-8 py-3 w-full sm:w-auto border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        BUILD NOW <MoveRight size={16} />
                    </button>
                </form> */}

                <p className="text-brand-dark/70 font-mono text-xs font-bold uppercase tracking-widest">
                    NO SPAM. UNSUBSCRIBE ANYTIME.
                </p>
            </div>
        </section>
    );
}
