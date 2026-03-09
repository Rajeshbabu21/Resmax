import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { register, login } from '../services/authService';

export default function Signup() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            // Call centralized user registration schema map
            await register({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            });

            // SUCCESS! Now automatically log them in via the service layer
            let loginData;
            try {
                loginData = await login(formData.email, formData.password);
            } catch (loginErr) {
                // Registration succeeded but auto-login failed
                navigate('/signin');
                return;
            }

            // Store the token and redirect to home
            localStorage.setItem('access_token', loginData.access_token);
            window.dispatchEvent(new Event('authChange'));
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
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-brand-dark hidden md:block"></div>

            <div className="w-full max-w-5xl mx-auto pt-6 pb-4">
                <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold text-gray-600 hover:text-brand-dark transition-colors bg-white px-3 py-1.5 border-2 border-transparent hover:border-brand-dark shadow-none hover:shadow-[4px_4px_0px_0px_var(--color-brand-dark)]">
                    <ArrowLeft size={16} /> BACK TO HOME
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <AuthCard
                    title="Sign Up"
                    subtitle="Join as users building ATS-optimized resumes and getting hired faster."
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-mono border border-red-200">
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Input
                                label="FIRST NAME"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Alex"
                            />
                            <Input
                                label="LAST NAME"
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Doe"
                            />
                        </div>

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

                        <Input
                            label="CONFIRM PASSWORD"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
