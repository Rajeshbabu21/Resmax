import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { dummyResumeData } from './DummyData';
import Button from '../ui/Button';

export default function ResumeBuilder() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTemplate = searchParams.get('template') || 'classic';

    const [resumeData, setResumeData] = useState(dummyResumeData);
    const [templateId, setTemplateId] = useState(initialTemplate);

    useEffect(() => {
        // Sync URL param if template changes internally
        if (templateId !== searchParams.get('template')) {
            setSearchParams({ template: templateId }, { replace: true });
        }
    }, [templateId, setSearchParams, searchParams]);


    const handleDownload = () => {
        alert("Download feature coming soon!");
    };

    return (
        <div className="flex flex-col h-screen pt-[72px] md:pt-[76px]">
            {/* Action Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-brand-light border-b-2 border-brand-dark z-10 shrink-0">
                <div className="flex items-center gap-6">
                    <h1 className="font-mono-title font-bold text-xl uppercase tracking-widest hidden md:block">Resumax Builder</h1>

                    {/* Template Selector */}
                    <div className="flex border-2 border-brand-dark bg-white overflow-hidden shadow-[2px_2px_0px_0px_var(--color-brand-blue)] font-mono text-sm uppercase font-bold">
                        <select
                            value={templateId}
                            onChange={(e) => setTemplateId(e.target.value)}
                            className="bg-transparent pl-3 pr-8 py-2 focus:outline-none focus:ring-0 appearance-none cursor-pointer relative z-10"
                            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #0f172a 50%), linear-gradient(135deg, #0f172a 50%, transparent 50%)', backgroundPosition: 'calc(100% - 15px) calc(1em + 2px), calc(100% - 10px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                        >
                            <option value="classic">The Classic</option>
                            <option value="modern">The Modern</option>
                            <option value="creative">The Creative</option>
                            <option value="executive">The Executive</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" className="hidden sm:block">Save Draft</Button>
                    <Button onClick={handleDownload}>Export PDF</Button>
                </div>
            </div>

            {/* Builder Layout */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Form Pane */}
                <div className="w-full lg:w-1/2 p-4 md:p-8 bg-brand-light/50 border-r-0 lg:border-r-2 border-brand-dark overflow-hidden">
                    <div className="h-full max-h-full">
                        <ResumeForm data={resumeData} onChange={setResumeData} />
                    </div>
                </div>

                {/* Preview Pane */}
                <div className="w-full lg:w-1/2 p-4 md:p-8 bg-gray-100 overflow-y-auto overflow-x-hidden flex justify-center">
                    <div className="max-w-full">
                        <ResumePreview data={resumeData} templateId={templateId} />
                    </div>
                </div>
            </div>
        </div>
    );
}
