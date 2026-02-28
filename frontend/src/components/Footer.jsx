import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t-2 border-brand-dark px-4 py-8 md:px-12 flex flex-col md:flex-row justify-between items-center z-10 relative">
            <div className="font-mono-title text-xl font-bold tracking-tight mb-4 md:mb-0">Poplio.</div>

            <div className="flex gap-8 text-xs font-mono uppercase tracking-widest mb-4 md:mb-0">
                <a href="#" className="hover:opacity-70 transition-opacity">Privacy</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Terms</a>
            </div>

            <div className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-4">
                © 2026 Poplio
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 hidden md:block">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
                </svg>
            </div>
        </footer>
    );
}
