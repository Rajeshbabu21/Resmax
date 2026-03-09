import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { login } from '../services/authService';

export default function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Centralized auth service call maps our UI params to the network
            const data = await login(formData.email, formData.password);

            // Store the token
            localStorage.setItem('access_token', data.access_token);
            window.dispatchEvent(new Event('authChange'));

            // Redirect to home or dashboard
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
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
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-mono border border-red-200">
                                {error}
                            </div>
                        )}
                        <Input
                            label="EMAIL ADDRESS"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                        />

                        <Input
                            label="PASSWORD"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />

                        {/* <div className="flex justify-end mt-[-10px]">
                            <a href="#" className="font-mono text-xs font-bold text-gray-500 hover:text-brand-pink transition-colors underline decoration-brand-pink/30 hover:decoration-brand-pink underline-offset-4">
                                Forgot Password?
                            </a>
                        </div> */}

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
