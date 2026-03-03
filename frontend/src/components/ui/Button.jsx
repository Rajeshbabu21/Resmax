import React from 'react';

export default function Button({ children, className = '', variant = 'primary', isLoading, ...props }) {
    const baseClasses = "cursor-pointer font-mono font-bold uppercase tracking-widest text-sm px-8 py-3 border-2 border-brand-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap";

    let variantClasses = "";
    if (variant === 'primary') {
        variantClasses = "bg-brand-blue text-white shadow-[4px_4px_0px_0px_var(--color-brand-dark)] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_var(--color-brand-dark)]";
    } else if (variant === 'secondary') {
        variantClasses = "bg-brand-pink text-white shadow-[4px_4px_0px_0px_var(--color-brand-dark)] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_var(--color-brand-dark)]";
    } else if (variant === 'outline') {
        variantClasses = "bg-white text-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-dark)] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_var(--color-brand-dark)]";
    } else if (variant === 'ghost') {
        variantClasses = "text-brand-dark hover:text-brand-blue border-transparent bg-transparent hover:bg-gray-50 shadow-none hover:-translate-y-[1px]";
    }

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}
