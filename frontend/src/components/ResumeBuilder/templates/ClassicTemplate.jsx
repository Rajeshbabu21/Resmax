import React from 'react';

export default function ClassicTemplate({ data }) {
    return (
        <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg font-body text-gray-800 transition-all duration-300">
            {/* Header / Personal Info */}
            <header className="border-b-2 border-gray-300 pb-4 mb-6 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.address && <span>• {data.personalInfo.address}</span>}
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.portfolio && <span>• {data.personalInfo.portfolio}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section className="mb-6">
                    <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider text-gray-900">Experience</h2>
                    <div className="flex flex-col gap-4">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-sm font-semibold text-gray-700">{exp.company}</span>
                                    <span className="text-sm text-gray-600">{exp.location}</span>
                                </div>
                                <p className="text-sm leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider text-gray-900">Education</h2>
                    <div className="flex flex-col gap-4">
                        {data.education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                    <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-sm font-semibold text-gray-700">{edu.school}</span>
                                    <span className="text-sm text-gray-600">{edu.location}</span>
                                </div>
                                <p className="text-sm leading-relaxed">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider text-gray-900">Skills</h2>
                    <p className="text-sm leading-relaxed">
                        {data.skills.join(', ')}
                    </p>
                </section>
            )}
        </div>
    );
}
