import React from 'react';

export default function ExecutiveTemplate({ data }) {
    return (
        <div className="bg-white p-10 max-w-4xl mx-auto shadow-md font-serif text-gray-900 transition-all duration-300">
            {/* Header */}
            <header className="border-b-4 border-double border-gray-800 pb-3 mb-5 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                <div className="flex justify-center items-center gap-3 text-sm font-sans">
                    {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
                    {data.personalInfo.address && (data.personalInfo.phone || data.personalInfo.email) && <span>|</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.phone && data.personalInfo.email && <span>|</span>}
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                </div>
                {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
                    <div className="flex justify-center items-center gap-3 text-sm font-sans mt-1">
                        {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                        {data.personalInfo.linkedin && data.personalInfo.portfolio && <span>|</span>}
                        {data.personalInfo.portfolio && <span>{data.personalInfo.portfolio}</span>}
                    </div>
                )}
            </header>

            {/* Core Competencies (Skills) */}
            {data.skills.length > 0 && (
                <section className="mb-4 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1 text-gray-600">Core Competencies</p>
                    <p className="text-sm font-sans font-medium text-gray-800">
                        {data.skills.join(' • ')}
                    </p>
                </section>
            )}

            {/* Executive Summary */}
            {data.personalInfo.summary && (
                <section className="mb-6">
                    <p className="text-sm leading-relaxed text-justify px-4">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Professional Experience */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-2 pb-1">Professional Experience</h2>
                    <div className="flex flex-col gap-4 relative">
                        {data.experience.map((exp, i) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-end mb-1">
                                    <h3 className="font-bold text-base uppercase">{exp.company}</h3>
                                    <span className="text-sm font-sans font-medium">{exp.location}</span>
                                </div>
                                <div className="flex justify-between items-start mb-2 italic">
                                    <span className="text-sm font-bold">{exp.title}</span>
                                    <span className="text-sm font-sans text-gray-700">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <p className="text-sm leading-relaxed font-sans text-gray-800 text-justify mb-1">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-2 pb-1">Education</h2>
                    <div className="flex flex-col gap-3">
                        {data.education.map(edu => (
                            <div key={edu.id} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-bold text-sm inline-block mr-2">{edu.school},</h3>
                                    <span className="text-sm font-sans">{edu.location}</span>
                                    <div className="text-sm italic">{edu.degree}</div>
                                </div>
                                <span className="text-sm font-sans text-gray-700">{edu.graduationDate}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}
