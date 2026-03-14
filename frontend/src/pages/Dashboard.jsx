import React from 'react';
import { TrendingUp, FileText, BookOpen, Brain, Star, BarChart2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getProfile } from '../services/dashboard';

export default function Dashboard() {
    const [profile, setProfile] = React.useState(null);
    React.useEffect(() => {
        getProfile().then((data) => {
            setProfile(data);
        });
    }, []);
    return (
        <div className="min-h-screen w-full bg-white text-brand-dark bg-grid pt-28 px-4 md:px-12 pb-12 overflow-x-hidden relative">
            <Header />
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center md:text-left flex flex-col items-center md:items-start">
                    <h1 className="text-4xl md:text-5xl font-mono-title font-bold text-brand-dark mb-4 tracking-tight uppercase border-b-4 border-brand-pink pb-2 w-fit">
                        {profile ? `${profile.first_name} ${profile.last_name}` : 'Welcome'}
                    </h1>
                    <p className="font-mono text-brand-dark text-sm md:text-base font-bold bg-[#f0f0f0] inline-block w-fit px-3 py-1 border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)]">
                        Here's an overview of your resume and career progress.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column container */}
                    <div className="col-span-1 flex flex-col gap-8">
                        {/* Chart */}
                        <div className="bg-white border-4 border-brand-dark rounded-xl p-6 flex flex-col relative h-[450px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center gap-3 mb-8 border-b-2 border-brand-dark pb-4">
                                <div className="bg-brand-blue p-2 rounded-none text-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <TrendingUp size={24} strokeWidth={3} />
                                </div>
                                <h2 className="text-brand-dark font-mono font-bold text-xl uppercase tracking-widest">Industry Benchmark</h2>
                            </div>

                            <div className="flex-1 w-full relative pl-2 overflow-visible">
                                {/* Re-colored SVG Chart mimicking the requested light theme colors */}
                                <svg className="w-full h-[200px] overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Main curve path fill */}
                                    <path d="M 20 180 C 150 180, 180 20, 260 20 C 310 20, 330 100, 380 160 L 380 180 L 20 180 Z" fill="url(#blueGradient)" />

                                    {/* Fill for the Hire Zone */}
                                    <path d="M 320 180 L 320 67.5 C 330 100, 345 130, 380 160 L 380 180 Z" fill="url(#greenGradient)" />

                                    {/* Main curve line */}
                                    <path d="M 20 180 C 150 180, 180 20, 260 20 C 310 20, 330 100, 380 160" fill="none" stroke="#2563eb" strokeWidth="4" />

                                    {/* X Axis base line */}
                                    <line x1="20" y1="180" x2="380" y2="180" stroke="#000000" strokeWidth="2" />

                                    {/* Target / You point and lines */}
                                    <line x1="200" y1="52" x2="200" y2="180" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 6" />
                                    <circle cx="200" cy="52" r="8" fill="#ec4899" stroke="#000000" strokeWidth="3" />

                                    {/* Hire Zone division line */}
                                    <line x1="320" y1="67.5" x2="320" y2="180" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" />

                                    {/* Labels inside chart */}
                                    <text x="200" y="32" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="monospace">You ({profile ? Math.round(profile.ats_score) : 0})</text>
                                    <text x="350" y="55" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="bold" fontFamily="monospace">Hire Zone 85 +</text>
                                </svg>
                                {/* X Axis Labels */}
                                <div className="flex justify-between px-6 text-sm font-bold font-mono text-brand-dark mt-4 border-t-2 border-brand-dark pt-2">
                                    <span>40</span>
                                    <span>60</span>
                                    <span>80</span>
                                    <span>92</span>
                                </div>
                            </div>

                        </div>

                        {/* Resumes List inside Pink Shadow Div */}
                        <div className="bg-white border-4 border-brand-dark rounded-xl p-6 shadow-[8px_8px_0px_0px_var(--color-brand-pink)] flex flex-col gap-4 group">
                            <h2 className="text-brand-dark font-mono font-bold text-xl uppercase tracking-widest border-b-2 border-brand-dark pb-2 mb-2">Your Resumes</h2>

                            {/* Resume Item 1 */}
                            <div className="flex items-center justify-between p-4 border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-all cursor-pointer bg-[#f0f0f0]">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 border-2 border-brand-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-blue hover:text-white transition-colors">
                                        <FileText size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="font-mono font-bold text-brand-dark text-sm uppercase tracking-wide">Frontend_Dev_v2.pdf</p>
                                        <p className="font-mono text-xs text-gray-600 font-bold">Score: 73 &bull; Updated today</p>
                                    </div>
                                </div>
                            </div>

                            {/* Resume Item 2 */}
                            <div className="flex items-center justify-between p-4 border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer bg-white mt-1">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#f0f0f0] p-2 border-2 border-brand-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-pink hover:text-white transition-colors">
                                        <FileText size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="font-mono font-bold text-brand-dark text-sm uppercase tracking-wide">Soft_Eng_Base.pdf</p>
                                        <p className="font-mono text-xs text-gray-600 font-bold">Score: 61 &bull; 2 weeks ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Right Column - Stats & Breakdown */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                        {/* 4 Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-white border-4 border-brand-dark rounded-none p-5 shadow-[4px_4px_0px_0px_var(--color-brand-blue)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-blue)] transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-brand-dark font-bold font-mono">
                                        <FileText size={20} strokeWidth={2.5} />
                                        <span className="text-sm uppercase tracking-wider">Resumes</span>
                                    </div>
                                    <span className="text-brand-pink font-bold group-hover:scale-125 transition-transform">&rarr;</span>
                                </div>
                                <div className="text-4xl font-black font-mono-title text-brand-dark">{profile?.resumes || 0}</div>
                            </div>

                            <div className="bg-white border-4 border-brand-dark rounded-none p-5 shadow-[4px_4px_0px_0px_var(--color-brand-pink)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-brand-pink)] transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-brand-dark font-bold font-mono">
                                        <BookOpen size={20} strokeWidth={2.5} />
                                        <span className="text-sm uppercase tracking-wider">Cover Letters</span>
                                    </div>
                                    <span className="text-brand-blue font-bold group-hover:scale-125 transition-transform">&rarr;</span>
                                </div>
                                <div className="text-4xl font-black font-mono-title text-brand-dark">{profile?.cover_letters || 0}</div>
                            </div>

                            <div className="bg-white border-4 border-brand-dark rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-brand-dark font-bold font-mono">
                                        <Brain size={20} strokeWidth={2.5} />
                                        <span className="text-sm uppercase tracking-wider">Email Drafts</span>
                                    </div>
                                    <span className="text-brand-pink font-bold group-hover:scale-125 transition-transform">&rarr;</span>
                                </div>
                                <div className="text-4xl font-black font-mono-title text-brand-dark">{profile?.email_drafts || 0}</div>
                            </div>

                            <div className="bg-brand-dark text-white border-4 border-brand-dark rounded-none p-5 shadow-[4px_4px_0px_0px_var(--color-brand-blue)] cursor-default">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 font-bold font-mono text-[#eab308]">
                                        <Star size={20} strokeWidth={2.5} fill="currentColor" />
                                        <span className="text-sm uppercase tracking-wider text-white">Avg Score</span>
                                    </div>
                                </div>
                                <div className="text-4xl font-black font-mono-title text-brand-pink">{profile ? Math.round(profile.ats_score) : 0} <span className="text-lg font-bold font-mono text-white">/100</span></div>
                            </div>
                        </div>

                        {/* Score Breakdown Card */}
                        <div className="bg-white border-4 border-brand-dark rounded-xl p-6 flex-1 flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center gap-3 mb-8 border-b-2 border-brand-dark pb-4">
                                <div className="bg-brand-pink p-2 rounded-none text-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <BarChart2 size={24} strokeWidth={3} />
                                </div>
                                <h2 className="text-brand-dark font-mono font-bold text-xl uppercase tracking-widest">Score Breakdown</h2>
                            </div>

                            <div className="flex flex-col gap-6 flex-1 justify-center">
                                {/* Bar 1 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                                        <span className="text-brand-pink uppercase font-black tracking-widest">Content Quality (needs work)</span>
                                        <span className="text-brand-dark border-2 border-brand-dark px-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-xs py-1">{profile?.content_quality || 0}/40</span>
                                    </div>
                                    <div className="w-full bg-[#f0f0f0] h-4 rounded-none border-2 border-brand-dark overflow-hidden relative shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]">
                                        <div className="bg-brand-pink border-r-2 border-brand-dark h-full" style={{ width: `${((profile?.content_quality || 0) / 40) * 100}%` }}></div>
                                    </div>
                                </div>

                                {/* Bar 2 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                                        <span className="text-brand-dark uppercase">ATS & Structure</span>
                                        <span className="text-brand-dark border-2 border-brand-dark px-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-xs py-1">{profile?.ats_structure || 0}/20</span>
                                    </div>
                                    <div className="w-full bg-[#f0f0f0] h-4 rounded-none border-2 border-brand-dark overflow-hidden relative shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]">
                                        <div className="bg-brand-blue border-r-2 border-brand-dark h-full" style={{ width: `${((profile?.ats_structure || 0) / 20) * 100}%` }}></div>
                                    </div>
                                </div>

                                {/* Bar 3 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                                        <span className="text-brand-dark uppercase">Job Optimization</span>
                                        <span className="text-brand-dark border-2 border-brand-dark px-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-xs py-1">{profile?.job_optimization || 0}/25</span>
                                    </div>
                                    <div className="w-full bg-[#f0f0f0] h-4 rounded-none border-2 border-brand-dark overflow-hidden relative shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]">
                                        <div className="bg-[#eab308] border-r-2 border-brand-dark h-full" style={{ width: `${((profile?.job_optimization || 0) / 25) * 100}%` }}></div>
                                    </div>
                                </div>

                                {/* Bar 4 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                                        <span className="text-brand-dark uppercase">Writing Quality</span>
                                        <span className="text-brand-dark border-2 border-brand-dark px-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-xs py-1">{profile?.writing_quality || 0}/10</span>
                                    </div>
                                    <div className="w-full bg-[#f0f0f0] h-4 rounded-none border-2 border-brand-dark overflow-hidden relative shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]">
                                        <div className="bg-[#eab308] border-r-2 border-brand-dark h-full" style={{ width: `${((profile?.writing_quality || 0) / 10) * 100}%` }}></div>
                                    </div>
                                </div>

                                {/* Bar 5 */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-mono font-bold">
                                        <span className="text-emerald-600 uppercase">Application Ready</span>
                                        <span className="text-white border-2 border-brand-dark px-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-emerald-500 text-xs py-1">{profile?.ready_to_apply || 0}/5</span>
                                    </div>
                                    <div className="w-full bg-[#f0f0f0] h-4 rounded-none border-2 border-brand-dark overflow-hidden relative shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]">
                                        <div className="bg-emerald-400 border-r-2 border-brand-dark h-full" style={{ width: `${((profile?.ready_to_apply || 0) / 5) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center bg-[#f0f0f0] border-2 border-brand-dark p-4 shadow-[4px_4px_0px_0px_var(--color-brand-blue)]">
                                <p className="text-brand-dark font-mono font-bold mb-2 uppercase tracking-wide">Focus on <span className="text-brand-pink text-lg underline">Content Quality</span> to boost your score</p>
                                <Link to="/builder" className="text-white bg-brand-dark px-4 py-2 mt-2 inline-block font-mono font-bold uppercase tracking-widest hover:bg-brand-blue border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] hover:translate-y-[2px] transition-all">See how to improve &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
