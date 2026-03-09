import React, { useState } from 'react';
import Button from '../ui/Button';

export default function AnalysisInput({ onAnalyze }) {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const handleAnalyze = () => {
        if (!resumeText || !jobDescription) {
            alert("Please paste both your resume and the job description to continue.");
            return;
        }
        onAnalyze();
    };

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">
            {/* Resume Input */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-2 border-b-2 border-brand-dark pb-2">Your Resume</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Paste the plaintext content of your resume here.</p>
                <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full h-[250px] border-2 border-brand-dark bg-brand-light/30 px-4 py-3 font-mono text-sm text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                    placeholder="E.g., John Doe\njohn.doe@email.com\n\nExperience:\nSoftware Engineer at Tech Inc..."
                ></textarea>

                {/* Mock Upload Button functionality */}
                <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1 h-px bg-brand-dark/20"></div>
                    <span className="font-mono text-xs font-bold uppercase text-brand-dark/50">OR</span>
                    <div className="flex-1 h-px bg-brand-dark/20"></div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-dashed" onClick={() => alert("File upload coming soon!")}>
                    + Upload PDF Resume
                </Button>
            </section>

            {/* Job Description Input */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-2 border-b-2 border-brand-dark pb-2">Target Job Description</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Paste the job description you are matching against.</p>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-[250px] border-2 border-brand-dark bg-brand-light/30 px-4 py-3 font-mono text-sm text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-pink resize-none"
                    placeholder="We are looking for a highly skilled Software Engineer with experience in React and Node.js..."
                ></textarea>
            </section>

            <Button onClick={handleAnalyze} className="w-full py-4 text-lg">
                RUN ATS ANALYSIS
            </Button>
        </div>
    );
}
