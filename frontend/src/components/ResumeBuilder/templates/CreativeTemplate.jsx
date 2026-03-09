import React from 'react';

export default function CreativeTemplate({ data }) {
    return (
        <div className="bg-brand-light p-8 max-w-4xl mx-auto shadow-[12px_12px_0px_0px_var(--color-brand-dark)] border-4 border-brand-dark font-mono text-brand-dark transition-all duration-300">

            {/* Header */}
            <header className="bg-brand-yellow border-b-4 border-brand-dark p-6 -mx-8 -mt-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight shadow-[4px_4px_0px_0px_var(--color-brand-pink)] bg-white px-4 py-2 border-2 border-brand-dark inline-block mb-2">
                        {data.personalInfo.firstName} {data.personalInfo.lastName}
                    </h1>
                </div>
                <div className="bg-white p-3 border-2 border-brand-dark flex flex-col gap-1 text-sm font-bold shadow-[4px_4px_0px_0px_var(--color-brand-blue)] w-full md:w-auto">
                    {data.personalInfo.email && <div className="flex justify-between gap-4"><span>EMAIL:</span> <span>{data.personalInfo.email}</span></div>}
                    {data.personalInfo.phone && <div className="flex justify-between gap-4"><span>PHONE:</span> <span>{data.personalInfo.phone}</span></div>}
                    {data.personalInfo.linkedin && <div className="flex justify-between gap-4"><span>LINK:</span> <span>{data.personalInfo.linkedin}</span></div>}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content (2/3 width) */}
                <div className="md:col-span-2 flex flex-col gap-8">
                    {data.personalInfo.summary && (
                        <section className="bg-white p-4 border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)]">
                            <h2 className="text-xl font-black uppercase mb-2 border-b-2 border-brand-dark pb-1 inline-block">/// Profile</h2>
                            <p className="text-sm font-body font-medium">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase mb-4 bg-brand-dark text-white inline-block px-3 py-1 -skew-x-6">Experience</h2>
                            <div className="flex flex-col gap-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="bg-white border-2 border-brand-dark p-4 shadow-[4px_4px_0px_0px_var(--color-brand-dark)]">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 border-b-2 border-brand-dark/20 pb-2">
                                            <h3 className="font-bold text-lg uppercase bg-brand-pink/20 px-1 inline-block">{exp.title}</h3>
                                            <span className="text-xs font-bold bg-brand-dark text-white px-2 py-0.5 mt-2 sm:mt-0">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-bold mb-3">
                                            @{exp.company} <span className="text-gray-500 font-normal">[{exp.location}]</span>
                                        </div>
                                        <p className="text-sm font-body">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar (1/3 width) */}
                <div className="flex flex-col gap-8">
                    {data.skills.length > 0 && (
                        <section className="bg-white p-4 border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)]">
                            <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-brand-dark pb-1">/// Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-brand-light border-2 border-brand-dark text-xs font-bold uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black uppercase mb-4 bg-brand-dark text-white inline-block px-3 py-1">Education</h2>
                            <div className="flex flex-col gap-4">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="border-l-4 border-brand-dark pl-3">
                                        <h3 className="font-bold text-sm uppercase">{edu.degree}</h3>
                                        <div className="text-xs font-bold text-brand-dark/70 mb-1">{edu.school}</div>
                                        <div className="text-[10px] bg-brand-yellow/50 inline-block px-1 font-bold">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

        </div>
    );
}
