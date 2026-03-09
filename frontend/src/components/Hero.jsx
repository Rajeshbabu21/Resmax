import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="w-full relative min-h-[90vh] flex flex-col items-center pt-24 pb-12 px-4">
            {/* Decorative Floating Squares & Stars */}
            <div className="absolute top-1/4 left-1/12 w-6 h-6 bg-brand-blue animate-pulse hidden md:block"></div>
            <div className="absolute bottom-1/4 right-1/12 w-4 h-4 bg-brand-pink hidden md:block"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-brand-dark hidden md:block"></div>

            {/* Launching Badge */}
            <div className="mb-12 inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-1.5 font-mono text-xs uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_var(--color-brand-blue)] border-2 border-brand-dark relative z-10">
                <span className="text-brand-pink text-[10px]">■</span> LAUNCHING 2026
            </div>

            {/* Main Headline */}
            <div className="text-center relative z-10 mb-8 max-w-4xl mx-auto">
                <h1 className="text-6xl sm:text-7xl md:text-[6rem] leading-[1.1] font-bold font-custom-heading tracking-tight text-brand-dark relative">
                    Resume in<span className="text-brand-dark">.</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-pink">Offer out</span>
                    <span className="text-brand-pink">.</span>

                    {/* Big Star absolute positioned */}
                    <svg className="absolute -top-4 -right-16 md:-right-24 w-24 md:w-32 h-24 md:h-32 text-purple-200 -z-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </h1>
            </div>

            {/* Subtitle */}
            <p className="text-center font-mono text-gray-600 text-sm md:text-base max-w-2xl mb-10 z-10 leading-relaxed">
                Build an ATS-optimized resume with AI. Analyze your score against job descriptions and get hired faster. No writing skills needed.
            </p>

            {/* Form */}
            <form className="flex flex-col sm:flex-row gap-4 mb-8 z-10 w-full max-w-xl mx-auto px-4" onSubmit={e => e.preventDefault()}>
                {/* <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="flex-1 border-2 border-brand-dark px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-shadow"
                /> */}
                <Link
                    to="/builder"
                    className="bg-brand-dark text-white font-mono text-sm md:text-base font-bold uppercase tracking-widest px-8 md:px-12 py-4 md:py-5 border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-blue)] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_var(--color-brand-blue)] transition-all flex items-center justify-center gap-4 group"
                >
                    BUILD YOUR COMPREHENSIVE RESUME NOW
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
            </form>

            {/* Waitlist count */}
            <div className="flex items-center gap-3 font-mono text-xs font-bold z-10 mb-20">
                <div className="flex -space-x-2">
                    {/* Pixel avatars mock */}
                    <div className="w-6 h-6 bg-brand-blue border-2 border-brand-dark rounded-sm flex items-center justify-center text-[10px] text-white">☺</div>
                    <div className="w-6 h-6 bg-brand-pink border-2 border-brand-dark rounded-sm flex items-center justify-center text-[10px] text-white">☻</div>
                    <div className="w-6 h-6 bg-brand-dark border-2 border-brand-dark rounded-sm flex items-center justify-center text-[10px] text-white">ツ</div>
                </div>
                <span>5k+ resumes built</span>
            </div>

            {/* Browser Mockup */}
            <div className="relative w-full max-w-3xl mx-auto px-4 z-10">

                {/* Floating stars around mockup */}
                <svg className="absolute -left-8 md:-left-16 bottom-10 w-16 h-16 text-pink-300 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
                <svg className="absolute -right-6 md:-right-12 top-10 w-12 h-12 text-pink-500 animate-[pulse_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>

                <div className="w-full bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-dark)] rounded-sm overflow-hidden flex flex-col">
                    {/* Mockup Title Bar */}
                    <div className="bg-brand-dark text-white px-4 py-3 flex items-center border-b-2 border-brand-dark">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto bg-white text-brand-dark font-mono text-xs px-8 py-1 truncate max-w-[200px]">
                            your_resume.pdf
                        </div>
                        <div className="w-12"></div> {/* Spacer for balance */}
                    </div>

                    {/* Mockup Content (Resume Layout Document) */}
                    <div className="p-8 md:p-12 bg-white flex flex-col w-full">
                        {/* Header Block */}
                        <div className="w-full flex flex-col items-center mb-8">
                            <div className="w-48 md:w-56 h-8 md:h-10 bg-brand-dark mb-3"></div>
                            <div className="w-64 md:w-72 h-3 md:h-4 bg-[#e2e8f0]"></div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-brand-dark mb-8"></div>

                        <div className="w-full text-left">
                            {/* Pink Block */}
                            <div className="w-24 md:w-32 h-5 md:h-6 bg-brand-pink mb-6"></div>

                            {/* Experience 1 */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-32 md:w-48 h-4 md:h-5 bg-brand-dark"></div>
                                    <div className="w-16 md:w-24 h-4 md:h-5 bg-[#cbd5e1]"></div>
                                </div>
                                <div className="space-y-3 ml-2 pl-4 border-l-2 border-gray-100">
                                    <div className="w-full md:w-[95%] h-2.5 md:h-3 bg-[#e2e8f0]"></div>
                                    <div className="w-[90%] h-2.5 md:h-3 bg-[#e2e8f0]"></div>
                                    <div className="w-[85%] h-2.5 md:h-3 bg-[#e2e8f0]"></div>
                                </div>
                            </div>

                            {/* Experience 2 */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-40 md:w-56 h-4 md:h-5 bg-brand-dark"></div>
                                    <div className="w-16 md:w-24 h-4 md:h-5 bg-[#cbd5e1]"></div>
                                </div>
                                <div className="space-y-3 ml-2 pl-4 border-l-2 border-gray-100">
                                    <div className="w-[88%] h-2.5 md:h-3 bg-[#a5b4fc]"></div>
                                    <div className="w-[92%] h-2.5 md:h-3 bg-[#e2e8f0]"></div>
                                    <div className="w-[98%] h-2.5 md:h-3 bg-[#e2e8f0]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
