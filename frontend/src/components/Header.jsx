import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-white z-50 border-b-2 border-brand-dark px-4 py-4 md:px-8 flex justify-between items-center">
            <Link to="/" className="font-mono-title text-2xl font-bold tracking-tight">Resumax.</Link>

            <nav className="hidden md:flex gap-8 text-sm font-mono tracking-widest uppercase">
                <a href="/#how-it-works" className="hover:opacity-70 transition-opacity">AI Resume Builder</a>
                <a href="/#features" className="hover:opacity-70 transition-opacity">ATS Analysis</a>
                <a href="/#examples" className="hover:opacity-70 transition-opacity">Templates</a>
            </nav>

            <div className="flex items-center gap-4">
                <Link to="/signin" className="hidden md:block font-mono text-sm font-bold hover:text-brand-pink transition-colors">
                    SIGN IN
                </Link>
                <Link to="/signup" className="bg-brand-dark text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-widest border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-all block">
                    SIGN UP
                </Link>
            </div>
        </header>
    );
}
