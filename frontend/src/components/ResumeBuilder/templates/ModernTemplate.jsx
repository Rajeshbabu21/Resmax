import React from 'react';

export default function ModernTemplate({ data }) {
    return (
        <div className="bg-gray-50 p-10 max-w-4xl mx-auto shadow-2xl font-body text-gray-800 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Column (Sidebar) */}
                <div className="w-full md:w-1/3">
                    <header className="mb-8 border-l-4 border-brand-pink pl-4">
                        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 leading-none mb-2">
                            {data.personalInfo.firstName} <br />
                            <span className="text-brand-pink">{data.personalInfo.lastName}</span>
                        </h1>
                    </header>

                    <div className="text-sm text-gray-600 flex flex-col gap-2 mb-8">
                        {data.personalInfo.email && <div className="break-all">{data.personalInfo.email}</div>}
                        {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                        {data.personalInfo.address && <div>{data.personalInfo.address}</div>}
                        {data.personalInfo.linkedin && (
                            <div className="mt-2 text-brand-dark font-medium">{data.personalInfo.linkedin}</div>
                        )}
                        {data.personalInfo.portfolio && (
                            <div className="text-brand-dark font-medium">{data.personalInfo.portfolio}</div>
                        )}
                    </div>

                    {data.skills.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-white border border-gray-200 text-xs text-gray-700 rounded-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Main Content) */}
                <div className="w-full md:w-2/3">
                    {data.personalInfo.summary && (
                        <section className="mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-4">Profile</h2>
                            <p className="text-sm leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-4">Experience</h2>
                            <div className="flex flex-col gap-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute w-2 h-2 bg-brand-pink rounded-full -left-[5px] top-1.5"></div>
                                        <h3 className="font-bold text-gray-900 text-lg">{exp.title}</h3>
                                        <div className="text-sm text-gray-500 mb-2 font-medium">
                                            {exp.company} • {exp.startDate} - {exp.endDate}
                                        </div>
                                        <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-4">Education</h2>
                            <div className="flex flex-col gap-6">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute w-2 h-2 bg-brand-pink rounded-full -left-[5px] top-1.5"></div>
                                        <h3 className="font-bold text-gray-900 text-lg">{edu.degree}</h3>
                                        <div className="text-sm text-gray-500 mb-2 font-medium">
                                            {edu.school} • {edu.graduationDate}
                                        </div>
                                        {edu.description && (
                                            <p className="text-sm leading-relaxed text-gray-700">{edu.description}</p>
                                        )}
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
