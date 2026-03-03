import React from 'react';

export default function AuthCard({ children, title, subtitle }) {
    return (
        <div className="w-full max-w-md mx-auto relative z-10">
            {/* Floating decorative elements behind the card */}
            <svg className="absolute -left-8 -top-8 w-16 h-16 text-brand-pink animate-pulse -z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-brand-blue animate-pulse hidden sm:block -z-10"></div>
            <div className="absolute top-1/4 -right-12 w-6 h-6 bg-brand-dark animate-pulse hidden sm:block -z-10"></div>

            <div className="w-full bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-dark)] rounded-sm overflow-hidden flex flex-col">
                {/* Mockup Title Bar like the one in Hero */}
                <div className="bg-brand-dark text-white px-4 py-3 flex items-center border-b-2 border-brand-dark">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto bg-white text-brand-dark font-mono text-xs px-8 py-1 truncate max-w-[200px] font-bold">
                        {title.toLowerCase().replace(/\s+/g, '_')}.exe
                    </div>
                    <div className="w-12"></div>
                </div>

                <div className="p-8 md:p-10 flex flex-col w-full">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-custom-heading tracking-tight text-brand-dark mb-2">
                            {title}<span className="text-brand-pink">.</span>
                        </h2>
                        {subtitle && (
                            <p className="font-mono text-gray-600 text-sm leading-relaxed">{subtitle}</p>
                        )}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
