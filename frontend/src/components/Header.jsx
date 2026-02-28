import React from 'react';

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-white z-50 border-b-2 border-brand-dark px-4 py-4 md:px-8 flex justify-between items-center">
            <div className="font-mono-title text-2xl font-bold tracking-tight">Poplio.</div>

            <nav className="hidden md:flex gap-8 text-sm font-mono tracking-widest uppercase">
                <a href="#how-it-works" className="hover:opacity-70 transition-opacity">How it works</a>
                <a href="#features" className="hover:opacity-70 transition-opacity">Features</a>
                <a href="#examples" className="hover:opacity-70 transition-opacity">Examples</a>
            </nav>

            <button className="bg-brand-dark text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-widest border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-all">
                Join Waitlist
            </button>
        </header>
    );
}
