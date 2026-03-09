import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ data, templateId = 'classic' }) {

    const renderTemplate = () => {
        switch (templateId) {
            case 'modern':
                return <ModernTemplate data={data} />;
            case 'creative':
                return <CreativeTemplate data={data} />;
            case 'executive':
                return <ExecutiveTemplate data={data} />;
            case 'classic':
            default:
                return <ClassicTemplate data={data} />;
        }
    };

    return (
        <div className="w-full flex justify-center origin-top transform scale-[0.6] md:scale-75 lg:scale-100 transition-transform">
            <div className="w-[816px] min-h-[1056px] relative">
                {renderTemplate()}
            </div>
        </div>
    );
}
