import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function Templates() {

    // We will use 4 distinct templates
    const templates = [
        {
            id: 'classic',
            name: 'The Classic',
            description: 'A clean, professional, and ATS-optimized single column layout. Perfect for traditional industries.',
            color: 'bg-brand-blue'
        },
        {
            id: 'modern',
            name: 'The Modern',
            description: 'Elegant typography with subtle accents and plenty of whitespace. Ideal for tech and forward-thinking roles.',
            color: 'bg-brand-pink'
        },
        {
            id: 'creative',
            name: 'The Creative',
            description: 'Stand out with bold blocks and a neo-brutalism inspired aesthetic. Great for design and creative fields.',
            color: 'bg-brand-yellow'
        },
        {
            id: 'executive',
            name: 'The Executive',
            description: 'Highly condensed and structured for senior professionals with extensive histories to fit on fewer pages.',
            color: 'bg-brand-green'
        }
    ];

    return (
        <div className="min-h-screen w-full bg-white text-brand-dark overflow-x-hidden flex flex-col">
            <Header />

            <main className="flex-1 w-full bg-grid pt-24 pb-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-custom-heading font-bold tracking-tight mb-4 uppercase">
                            Choose Your <span className="bg-gradient-to-r from-brand-blue to-brand-pink text-transparent bg-clip-text">Weapon</span>
                        </h1>
                        <p className="font-mono text-gray-600 max-w-2xl mx-auto">
                            Start with one of our ATS-friendly designs. You can switch templates at any time inside the builder without losing your data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {templates.map((tpl) => (
                            <div key={tpl.id} className="bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-dark)] transition-transform hover:-translate-y-2 flex flex-col">

                                {/* Placeholder for visual preview */}
                                <div className={`h-48 w-full ${tpl.color} border-b-4 border-brand-dark flex items-center justify-center p-4 relative overflow-hidden`}>
                                    {/* Abstract visual representations of resume layouts based on the template type */}
                                    <div className="w-[120px] h-[160px] bg-white absolute shadow-lg rotate-3 p-2 flex flex-col gap-1">
                                        <div className={`w-full h-4 ${tpl.id === 'creative' ? tpl.color : 'bg-gray-200'} mb-2`}></div>
                                        {tpl.id === 'classic' && (
                                            <>
                                                <div className="w-1/2 h-2 bg-gray-300 mx-auto mb-2"></div>
                                                <div className="w-full h-1 bg-gray-200 mb-1"></div>
                                                <div className="w-full h-1 bg-gray-200 mb-1"></div>
                                                <div className="w-3/4 h-1 bg-gray-200 mb-3"></div>
                                                <div className="w-full h-1 bg-gray-200 mb-1"></div>
                                                <div className="w-full h-1 bg-gray-200"></div>
                                            </>
                                        )}
                                        {tpl.id === 'modern' && (
                                            <div className="flex gap-2 h-full">
                                                <div className="w-1/3 bg-gray-100 flex flex-col gap-1 p-1">
                                                    <div className="w-full h-4 bg-gray-300 rounded-full mb-1"></div>
                                                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                                                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                                                </div>
                                                <div className="w-2/3 flex flex-col gap-1 pt-1">
                                                    <div className="w-full h-2 bg-gray-300 mb-1"></div>
                                                    <div className="w-full h-1 bg-gray-200"></div>
                                                    <div className="w-3/4 h-1 bg-gray-200 mb-2"></div>
                                                    <div className="w-full h-1 bg-gray-200"></div>
                                                </div>
                                            </div>
                                        )}
                                        {tpl.id === 'creative' && (
                                            <>
                                                <div className={`w-full h-8 ${tpl.color} border-2 border-black mb-2`}></div>
                                                <div className="flex gap-1 h-full">
                                                    <div className="w-1/2 border-2 border-black p-1">
                                                        <div className="w-full h-1 bg-black mb-1"></div>
                                                        <div className="w-full h-1 bg-black"></div>
                                                    </div>
                                                    <div className="w-1/2 border-2 border-black p-1">
                                                        <div className="w-full h-1 bg-black mb-1"></div>
                                                        <div className="w-full h-1 bg-black"></div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {tpl.id === 'executive' && (
                                            <>
                                                <div className="w-3/4 h-3 bg-gray-800 mx-auto mb-1"></div>
                                                <div className="w-full border-t border-gray-400 mb-1"></div>
                                                <div className="flex justify-between mb-1">
                                                    <div className="w-1/3 h-1 bg-gray-600"></div>
                                                    <div className="w-1/4 h-1 bg-gray-400"></div>
                                                </div>
                                                <div className="w-full h-[2px] bg-gray-300 mb-[2px]"></div>
                                                <div className="w-full h-[2px] bg-gray-300 mb-[2px]"></div>
                                                <div className="flex justify-between mb-1 mt-1">
                                                    <div className="w-1/3 h-1 bg-gray-600"></div>
                                                    <div className="w-1/4 h-1 bg-gray-400"></div>
                                                </div>
                                                <div className="w-full h-[2px] bg-gray-300 mb-[2px]"></div>
                                                <div className="w-full h-[2px] bg-gray-300"></div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="font-mono-title text-xl font-bold uppercase mb-2">{tpl.name}</h3>
                                    <p className="font-mono text-sm text-gray-600 mb-6 flex-1">{tpl.description}</p>

                                    <Link to={`/builder?template=${tpl.id}`} className="block w-full">
                                        <Button className="w-full uppercase tracking-widest text-sm">Use Template</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
