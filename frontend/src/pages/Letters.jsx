import React from 'react';
import Header from '../components/Header';
import LettersContainer from '../components/Letters';

export default function Letters() {
    return (
        <div className="h-screen w-full bg-white text-brand-dark overflow-hidden flex flex-col">
            <Header />
            <main className="flex-1 w-full bg-grid overflow-hidden relative">
                <LettersContainer />
            </main>
        </div>
    );
}
