import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Signup() {
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
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-brand-dark hidden md:block"></div>

            <div className="w-full max-w-5xl mx-auto pt-6 pb-4">
                <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold text-gray-600 hover:text-brand-dark transition-colors bg-white px-3 py-1.5 border-2 border-transparent hover:border-brand-dark shadow-none hover:shadow-[4px_4px_0px_0px_var(--color-brand-dark)]">
                    <ArrowLeft size={16} /> BACK TO HOME
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <AuthCard
                    title="Sign Up"
                    subtitle="Join 5k+ users building ATS-optimized resumes and getting hired faster."
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Input
                                label="FIRST NAME"
                                type="text"
                                placeholder="Alex"
                            />
                            <Input
                                label="LAST NAME"
                                type="text"
                                placeholder="Doe"
                            />
                        </div>

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

                        <Input
                            label="CONFIRM PASSWORD"
                            type="password"
                            placeholder="••••••••"
                            required
                        />

                        <Button type="submit" variant="secondary" className="w-full mt-4" isLoading={isLoading}>
                            CREATE ACCOUNT <UserPlus size={16} />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t-2 border-brand-dark border-dashed text-center">
                        <p className="font-mono text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/signin" className="font-bold text-brand-dark hover:text-brand-pink transition-colors underline decoration-brand-pink/30 hover:decoration-brand-pink underline-offset-4">
                                SIGN IN
                            </Link>
                        </p>
                    </div>
                </AuthCard>
            </div>
        </div>
    );
}
