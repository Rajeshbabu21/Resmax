import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ResumeForm({ data, onChange }) {
    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                [name]: value
            }
        });
    };

    return (
        <div className="flex flex-col gap-8 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">

            {/* Personal Info Section */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Personal info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        name="firstName"
                        value={data.personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        value={data.personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={data.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={data.personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                    />
                    <div className="md:col-span-2">
                        <Input
                            label="Address"
                            name="address"
                            value={data.personalInfo.address}
                            onChange={handlePersonalInfoChange}
                        />
                    </div>
                    <Input
                        label="LinkedIn"
                        name="linkedin"
                        value={data.personalInfo.linkedin}
                        onChange={handlePersonalInfoChange}
                    />
                    <Input
                        label="Portfolio/Website"
                        name="portfolio"
                        value={data.personalInfo.portfolio}
                        onChange={handlePersonalInfoChange}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-mono font-bold uppercase mb-2">Professional Summary</label>
                    <textarea
                        name="summary"
                        value={data.personalInfo.summary}
                        onChange={handlePersonalInfoChange}
                        className="w-full border-2 border-brand-dark bg-white px-4 py-2 font-body text-brand-dark placeholder-brand-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-pink min-h-[100px]"
                        placeholder="Write a brief summary of your professional background..."
                    />
                </div>
            </section>

            {/* Experience Section (Simplified for now) */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Experience</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Add your relevant work experience here.</p>

                {data.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-6 pb-6 border-b-2 border-brand-dark/20 last:border-0 last:mb-0 last:pb-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Job Title" value={exp.title} readOnly />
                            <Input label="Company" value={exp.company} readOnly />
                            <Input label="Start Date" value={exp.startDate} readOnly />
                            <Input label="End Date" value={exp.endDate} readOnly />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-mono font-bold uppercase mb-2">Description</label>
                            <textarea value={exp.description} readOnly className="w-full border-2 border-brand-dark bg-brand-light px-4 py-2 font-body text-brand-dark min-h-[80px]" />
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                    + Add Experience
                </Button>
            </section>

            {/* Education Section (Simplified) */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-yellow)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Education</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Add your educational background.</p>
                {data.education.map((edu, index) => (
                    <div key={edu.id} className="mb-6 pb-6 border-b-2 border-brand-dark/20 last:border-0 last:mb-0 last:pb-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Degree" value={edu.degree} readOnly />
                            <Input label="School" value={edu.school} readOnly />
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                    + Add Education
                </Button>
            </section>

            {/* Skills Section (Simplified) */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-green)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-brand-light border-2 border-brand-dark font-mono text-xs font-bold uppercase">
                            {skill}
                        </span>
                    ))}
                </div>
                <Input label="Add Skill" placeholder="e.g. React" className="mt-4" />
            </section>

        </div>
    );
}
