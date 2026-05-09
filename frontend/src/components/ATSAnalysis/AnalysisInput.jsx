import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { apiRequest } from '../../services/api';

export default function AnalysisInput({ onAnalyze }) {
    const [role, setRole] = useState('Software Engineer');
    const [category, setCategory] = useState('Technology');
    const [experience, setExperience] = useState('Entry-Level');
    const [resumes, setResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isLoadingResumes, setIsLoadingResumes] = useState(false);

    useEffect(() => {
        const fetchResumes = async () => {
            setIsLoadingResumes(true);
            try {
                const response = await apiRequest('/get_user_resumes', { method: 'GET' });
                if (response && response.data) {
                    setResumes(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch resumes", err);
            } finally {
                setIsLoadingResumes(false);
            }
        };
        fetchResumes();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setSelectedResumeId(''); // Clear selected resume if file uploaded
        }
    };

    const handleResumeSelect = (e) => {
        setSelectedResumeId(e.target.value);
        if (e.target.value) {
            setUploadedFile(null); // Clear file if resume selected
        }
    };

    const handleAnalyze = () => {
        if (!role || !category || !experience) {
            alert("Please fill in role, category, and experience.");
            return;
        }
        if (!selectedResumeId && !uploadedFile) {
            alert("Please select a saved resume or upload a PDF.");
            return;
        }
        
        const formData = new FormData();
        formData.append('role', role);
        formData.append('category', category);
        formData.append('experience', experience);
        if (selectedResumeId) {
            formData.append('resume_id', selectedResumeId);
        }
        if (uploadedFile) {
            formData.append('file', uploadedFile);
        }
        
        onAnalyze(formData);
    };

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent pb-8">
            <div className="flex flex-col 2xl:flex-row gap-6 items-stretch w-full">
                {/* Target Job Details Input */}
                <section className="flex-1 flex flex-col bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] p-8 md:p-10">
                    <h2 className="font-mono-title text-2xl font-bold uppercase mb-6 border-b-2 border-brand-dark pb-3">Target Job Details</h2>
                    
                    <div className="flex flex-col gap-4">
                    <div className="flex-1">
                        <label className="block font-mono text-sm font-bold uppercase mb-1">Job Role</label>
                        <div className="relative">
                            <select 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full border-2 border-brand-dark bg-brand-light/30 px-4 py-4 font-mono text-base focus:outline-none focus:ring-2 focus:ring-brand-pink appearance-none cursor-pointer"
                            >
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="UI/UX Designer">UI/UX Designer</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-dark">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <label className="block font-mono text-sm font-bold uppercase mb-1">Category</label>
                        <div className="relative">
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border-2 border-brand-dark bg-brand-light/30 px-4 py-4 font-mono text-base focus:outline-none focus:ring-2 focus:ring-brand-pink appearance-none cursor-pointer"
                            >
                                <option value="Technology">Technology</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-dark">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <label className="block font-mono text-sm font-bold uppercase mb-1">Experience Level</label>
                        <div className="relative">
                            <select 
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full border-2 border-brand-dark bg-brand-light/30 px-4 py-4 font-mono text-base focus:outline-none focus:ring-2 focus:ring-brand-pink appearance-none cursor-pointer"
                            >
                                <option value="Entry-Level">Entry-Level (0-2 years)</option>
                                <option value="Mid-Level">Mid-Level (3-5 years)</option>
                                <option value="Senior">Senior (5+ years)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-dark">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                {/* Resume Selection */}
                <section className="flex-1 flex flex-col justify-between bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-8 md:p-10">
                <h2 className="font-mono-title text-2xl font-bold uppercase mb-6 border-b-2 border-brand-dark pb-3">Your Resume</h2>
                
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block font-mono text-sm font-bold uppercase mb-1">Select Saved Resume</label>
                        <div className="relative">
                            <select 
                                value={selectedResumeId}
                                onChange={handleResumeSelect}
                                disabled={isLoadingResumes || resumes.length === 0}
                                className="w-full border-2 border-brand-dark bg-brand-light/30 px-4 py-4 font-mono text-base focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="">{isLoadingResumes ? 'Loading...' : resumes.length === 0 ? 'No saved resumes found' : '-- Select a Resume --'}</option>
                                {resumes.map(r => (
                                    <option key={r.id} value={r.id}>{r.title}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-dark">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-brand-dark/20"></div>
                        <span className="font-mono text-xs font-bold uppercase text-brand-dark/50">OR</span>
                        <div className="flex-1 h-px bg-brand-dark/20"></div>
                    </div>

                    <div>
                        <label className="block font-mono text-sm font-bold uppercase mb-1">Upload New PDF</label>
                        <div className="relative border-2 border-dashed border-brand-dark bg-brand-light/30 p-6 text-center cursor-pointer hover:bg-brand-light/50 transition-colors group">
                            <input 
                                type="file" 
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <span className="font-mono text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                                {uploadedFile ? uploadedFile.name : "+ Click to Upload PDF"}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            </div>

            <Button onClick={handleAnalyze} className="w-full py-4 text-lg mt-2 mb-4">
                RUN ATS ANALYSIS
            </Button>
        </div>
    );
}
