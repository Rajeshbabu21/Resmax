import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Signin() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen bg-white text-brand-dark bg-grid flex flex-col p-4 relative overflow-hidden">
            {/* Background elements to match Hero */}
            <div className="absolute top-1/4 left-1/12 w-6 h-6 bg-brand-blue animate-pulse hidden md:block"></div>
            <div className="absolute bottom-1/4 right-1/12 w-4 h-4 bg-brand-pink hidden md:block"></div>

            <div className="w-full max-w-5xl mx-auto pt-6 pb-4">
                <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold text-gray-600 hover:text-brand-dark transition-colors bg-white px-3 py-1.5 border-2 border-transparent hover:border-brand-dark shadow-none hover:shadow-[4px_4px_0px_0px_var(--color-brand-dark)]">
                    <ArrowLeft size={16} /> BACK TO HOME
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <AuthCard
                    title="Sign In"
                    subtitle="Welcome back to Resume ATS. Ready to land your next role?"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <Input
                            label="EMAIL ADDRESS"
                            type="email"
                            placeholder="your@email.com"
                            required
                        />

                        <Input
                            label="PASSWORD"
                            type="password"
                            placeholder="••••••••"
                            required
                        />

                        <div className="flex justify-end mt-[-10px]">
                            <a href="#" className="font-mono text-xs font-bold text-gray-500 hover:text-brand-pink transition-colors underline decoration-brand-pink/30 hover:decoration-brand-pink underline-offset-4">
                                Forgot Password?
                            </a>
                        </div>

                        <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                            SIGN IN <LogIn size={16} />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t-2 border-brand-dark border-dashed text-center">
                        <p className="font-mono text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-bold text-brand-dark hover:text-brand-blue transition-colors underline decoration-brand-blue/30 hover:decoration-brand-blue underline-offset-4">
                                CREATE ONE
                            </Link>
                        </p>
                    </div>
                </AuthCard>
            </div>
        </div>
    );
}
