import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        const handleAuthChange = () => {
            setToken(localStorage.getItem('access_token'));
        };
        window.addEventListener('authChange', handleAuthChange);
        return () => window.removeEventListener('authChange', handleAuthChange);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('access_token');
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 w-screen bg-white z-50 flex justify-center backdrop-blur-md bg-white/90 border-b-2 border-brand-dark">
            <div className="w-full max-w-7xl px-4 py-4 md:px-8 flex justify-between items-center">
                <Link to="/" className="font-mono-title text-2xl font-bold tracking-tight">Resumax.</Link>

                <nav className="hidden md:flex gap-8 text-sm font-mono tracking-widest uppercase">
                    <Link to="/builder" className="hover:opacity-70 transition-opacity">AI Resume Builder</Link>
                    <Link to="/ats" className="hover:opacity-70 transition-opacity">ATS Analysis</Link>
                    <Link to="/templates" className="hover:opacity-70 transition-opacity">Templates</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {token ? (
                        <>
                            <Link to="/dashboard" className="hidden md:block font-mono text-sm font-bold hover:text-brand-pink transition-colors uppercase">
                                Dashboard
                            </Link>
                            <button onClick={handleSignOut} className="bg-brand-dark text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-widest border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-all block">
                                SIGN OUT
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="hidden md:block font-mono text-sm font-bold hover:text-brand-pink transition-colors">
                                SIGN IN
                            </Link>
                            <Link to="/signup" className="bg-brand-dark text-white font-mono text-xs uppercase px-4 py-2 font-bold tracking-widest border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-all block">
                                SIGN UP
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
