import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({ label, error, type = 'text', className = '', ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    // Toggle the password input type
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="font-mono text-sm font-bold text-brand-dark">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    className={`w-full border-2 border-brand-dark px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--color-brand-blue)] transition-shadow bg-white ${error ? 'border-red-500 focus:shadow-[4px_4px_0px_0px_#ef4444]' : ''} ${className}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-dark transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && (
                <span className="font-mono text-xs text-red-500 font-bold">{error}</span>
            )}
        </div>
    );
}
