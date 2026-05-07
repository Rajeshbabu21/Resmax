import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { generateEmailDraft, generateCoverLetter, getUserResumes } from '../../services/letters';

export default function LettersContainer() {
    const [activeTab, setActiveTab] = useState('email'); // 'email' | 'cover'
    const [isLoading, setIsLoading] = useState(false);
    
    // Form state
    const [resumeId, setResumeId] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    
    const [resumes, setResumes] = useState([]);
    
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await getUserResumes();
                if (res && res.data) {
                    setResumes(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch resumes:", error);
            }
        };
        fetchResumes();
    }, []);
    
    // Result state
    const [resultData, setResultData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleGenerate = async () => {
        if (!jobDescription) {
            alert("Please provide the Target Job Description.");
            return;
        }
        
        setIsLoading(true);
        setErrorMsg(null);
        setResultData(null);
        
        try {
            const payload = {
                job_description: jobDescription,
                resume_text: ''
            };
            if (resumeId) {
                payload.resume_id = parseInt(resumeId, 10);
            }
            
            let res;
            if (activeTab === 'email') {
                res = await generateEmailDraft(payload);
            } else {
                res = await generateCoverLetter(payload);
            }
            
            if (res && res.data && res.data.length > 0) {
                setResultData(res.data[0]);
            } else {
                setErrorMsg("Received empty response from the server.");
            }
        } catch (error) {
            setErrorMsg(error.message || "An error occurred while generating.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setResultData(null);
        setErrorMsg(null);
    };

    return (
        <div className="flex flex-col h-screen pt-[72px] md:pt-[76px]">
            {/* Action Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-brand-light border-b-2 border-brand-dark z-10 shrink-0">
                <h1 className="font-mono-title font-bold text-xl uppercase tracking-widest text-brand-dark">Resumax <span className="text-brand-pink">Letters</span></h1>
                
                {/* Tabs */}
                <div className="flex bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] rounded-none overflow-hidden">
                    <button 
                        onClick={() => { setActiveTab('email'); handleReset(); }}
                        className={`px-4 py-2 font-mono font-bold text-sm uppercase transition-colors ${activeTab === 'email' ? 'bg-brand-dark text-white' : 'hover:bg-brand-light text-brand-dark'}`}
                    >
                        Email
                    </button>
                    <div className="w-0.5 bg-brand-dark"></div>
                    <button 
                        onClick={() => { setActiveTab('cover'); handleReset(); }}
                        className={`px-4 py-2 font-mono font-bold text-sm uppercase transition-colors ${activeTab === 'cover' ? 'bg-brand-dark text-white' : 'hover:bg-brand-light text-brand-dark'}`}
                    >
                        Cover Letter
                    </button>
                </div>
            </div>

            {/* Application Layout */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">

                {/* Loader Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 z-50 bg-brand-light/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white border-4 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-blue)] p-8 flex flex-col items-center">
                            <div className="w-16 h-16 border-8 border-brand-dark/20 border-t-brand-blue rounded-full animate-spin mb-4"></div>
                            <h2 className="font-mono-title text-xl font-bold uppercase tracking-widest animate-pulse">Generating {activeTab === 'email' ? 'Email' : 'Cover Letter'}...</h2>
                        </div>
                    </div>
                )}

                {/* Input Pane */}
                <div className="w-full lg:w-1/2 lg:border-r-2 p-4 md:p-8 bg-brand-light/50 border-brand-dark overflow-hidden transition-all duration-300">
                    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">
                        <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-6">
                            <h2 className="font-mono-title text-xl font-bold uppercase mb-2 border-b-2 border-brand-dark pb-2">Select Resume</h2>
                            <p className="font-mono text-sm text-brand-dark/70 mb-4">Choose a saved resume or generate without one for entry level.</p>
                            <select
                                value={resumeId}
                                onChange={(e) => setResumeId(e.target.value)}
                                className="w-full border-2 border-brand-dark bg-brand-light/30 px-4 py-3 font-mono text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
                            >
                                <option value="">No Resume (Entry Level)</option>
                                {resumes.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.title} (ID: {r.id})
                                    </option>
                                ))}
                            </select>
                        </section>

                        <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] p-6">
                            <h2 className="font-mono-title text-xl font-bold uppercase mb-2 border-b-2 border-brand-dark pb-2">Target Job Description</h2>
                            <p className="font-mono text-sm text-brand-dark/70 mb-4">Paste the job description you are targeting.</p>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full h-[250px] border-2 border-brand-dark bg-brand-light/30 px-4 py-3 font-mono text-sm text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-pink resize-none"
                                placeholder="We are looking for a highly skilled..."
                            ></textarea>
                        </section>

                        <Button onClick={handleGenerate} className="w-full py-4 text-lg">
                            GENERATE {activeTab === 'email' ? 'EMAIL' : 'COVER LETTER'}
                        </Button>
                    </div>
                </div>

                {/* Results Pane */}
                <div className="w-full lg:w-1/2 p-4 md:p-8 bg-gray-50 overflow-y-auto">
                    <div className="max-w-full h-full">
                        {errorMsg ? (
                            <div className="bg-red-50 border-2 border-red-500 p-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
                                <h2 className="font-mono-title text-xl font-bold text-red-600 uppercase mb-2">Generation Failed</h2>
                                <p className="font-mono text-sm text-red-800">{errorMsg}</p>
                                <Button onClick={handleReset} variant="outline" className="mt-4 border-red-500 text-red-600 hover:bg-red-100">
                                    Try Again
                                </Button>
                            </div>
                        ) : resultData ? (
                            <div className="bg-white border-2 border-brand-dark shadow-[8px_8px_0px_0px_var(--color-brand-blue)] p-6 md:p-8 mb-8">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-brand-dark">
                                    <h2 className="font-mono-title text-2xl font-bold uppercase tracking-widest text-brand-dark">Generated {activeTab === 'email' ? 'Email' : 'Cover Letter'}</h2>
                                    <Button onClick={handleReset} variant="outline" className="text-xs py-2 px-3">
                                        Close
                                    </Button>
                                </div>

                                {activeTab === 'email' && resultData.email_subject && (
                                    <div className="mb-6">
                                        <h3 className="font-mono-title font-bold text-sm uppercase text-brand-dark/60 mb-1">Subject:</h3>
                                        <p className="font-mono text-brand-dark font-bold border-2 border-brand-dark bg-brand-light/50 p-3">{resultData.email_subject}</p>
                                    </div>
                                )}

                                <div className="prose max-w-none prose-p:font-mono prose-p:text-sm prose-p:leading-relaxed text-brand-dark">
                                    <div className="border-2 border-brand-dark bg-white p-6 min-h-[300px] whitespace-pre-wrap font-mono text-sm">
                                        {activeTab === 'email' ? resultData.email_body : resultData.cover_letter}
                                    </div>
                                </div>
                                
                                <div className="mt-6 flex justify-end">
                                    <Button 
                                        onClick={() => navigator.clipboard.writeText(activeTab === 'email' ? `${resultData.email_subject}\n\n${resultData.email_body}` : resultData.cover_letter)}
                                    >
                                        Copy to Clipboard
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-brand-dark/20 bg-brand-light/20 min-h-[400px]">
                                <h2 className="font-mono-title text-xl font-bold uppercase text-brand-dark/40 mb-4">Ready to Generate</h2>
                                <p className="font-mono text-sm text-brand-dark/50 max-w-md">
                                    Select a resume and provide a target job description on the left to generate your {activeTab === 'email' ? 'email draft' : 'cover letter'}.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
