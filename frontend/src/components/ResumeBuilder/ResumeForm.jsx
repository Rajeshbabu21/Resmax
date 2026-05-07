import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ResumeForm({ data, onChange }) {
    // Local state for adding new skills
    const [newSkill, setNewSkill] = useState('');

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

    // Experience Handlers
    const handleExperienceChange = (id, field, value) => {
        onChange({
            ...data,
            experience: data.experience.map(exp => 
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        });
    };

    const addExperience = () => {
        const newId = `exp_${Date.now()}`;
        onChange({
            ...data,
            experience: [
                ...data.experience,
                { id: newId, title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
            ]
        });
    };

    const removeExperience = (id) => {
        onChange({
            ...data,
            experience: data.experience.filter(exp => exp.id !== id)
        });
    };

    // Education Handlers
    const handleEducationChange = (id, field, value) => {
        onChange({
            ...data,
            education: data.education.map(edu => 
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        });
    };

    const addEducation = () => {
        const newId = `edu_${Date.now()}`;
        onChange({
            ...data,
            education: [
                ...data.education,
                { id: newId, degree: '', school: '', location: '', graduationDate: '', gpa: '', description: '' }
            ]
        });
    };

    const removeEducation = (id) => {
        onChange({
            ...data,
            education: data.education.filter(edu => edu.id !== id)
        });
    };

    // Skills Handlers
    const addSkill = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
                onChange({
                    ...data,
                    skills: [...data.skills, newSkill.trim()]
                });
                setNewSkill('');
            }
        }
    };

    const removeSkill = (skillToRemove) => {
        onChange({
            ...data,
            skills: data.skills.filter(skill => skill !== skillToRemove)
        });
    };

    // Projects Handlers
    const handleProjectChange = (id, field, value) => {
        onChange({
            ...data,
            projects: (data.projects || []).map(proj => 
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        });
    };

    const addProject = () => {
        const newId = `proj_${Date.now()}`;
        onChange({
            ...data,
            projects: [
                ...(data.projects || []),
                { id: newId, title: '', link: '', description: '' }
            ]
        });
    };

    const removeProject = (id) => {
        onChange({
            ...data,
            projects: (data.projects || []).filter(proj => proj.id !== id)
        });
    };

    return (
        <div className="flex flex-col gap-8 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">

            {/* Personal Info Section */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Personal info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" value={data.personalInfo.firstName} onChange={handlePersonalInfoChange} />
                    <Input label="Last Name" name="lastName" value={data.personalInfo.lastName} onChange={handlePersonalInfoChange} />
                    <Input label="Email" type="email" name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} />
                    <Input label="Phone" name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} />
                    <div className="md:col-span-2">
                        <Input label="Address" name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} />
                    </div>
                    <Input label="LinkedIn" name="linkedin" value={data.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
                    <Input label="Portfolio/Website" name="portfolio" value={data.personalInfo.portfolio} onChange={handlePersonalInfoChange} />
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

            {/* Experience Section */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-pink)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Experience</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Add your relevant work experience here.</p>

                {data.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-6 pb-6 border-b-2 border-brand-dark/20 last:border-0 last:mb-0 last:pb-0 relative group">
                        <Button 
                            variant="outline" 
                            className="absolute top-0 right-0 px-2 py-1 text-xs border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => removeExperience(exp.id)}
                        >
                            DELETE
                        </Button>
                        <h3 className="font-mono-title font-bold text-md mb-4 text-brand-dark">Experience {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} />
                            <Input label="Company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} />
                            <Input label="Location" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)} />
                            <div className="grid grid-cols-2 gap-2">
                                <Input label="Start Date" placeholder="MM/YYYY" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
                                <Input label="End Date" placeholder="MM/YYYY" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-mono font-bold uppercase mb-2">Description</label>
                            <textarea 
                                value={exp.description} 
                                onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                                className="w-full border-2 border-brand-dark bg-white px-4 py-2 font-body text-brand-dark min-h-[80px] focus:outline-none focus:ring-2 focus:ring-brand-pink" 
                            />
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={addExperience}>
                    + Add Experience
                </Button>
            </section>

            {/* Education Section */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-yellow)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Education</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Add your educational background.</p>
                {data.education.map((edu, index) => (
                    <div key={edu.id} className="mb-6 pb-6 border-b-2 border-brand-dark/20 last:border-0 last:mb-0 last:pb-0 relative group">
                        <Button 
                            variant="outline" 
                            className="absolute top-0 right-0 px-2 py-1 text-xs border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => removeEducation(edu.id)}
                        >
                            DELETE
                        </Button>
                        <h3 className="font-mono-title font-bold text-md mb-4 text-brand-dark">Education {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Degree / Program" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} />
                            <Input label="School / University" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} />
                            <Input label="Location" value={edu.location} onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)} />
                            <div className="grid grid-cols-2 gap-2">
                                <Input label="Graduation Date" placeholder="MM/YYYY" value={edu.graduationDate} onChange={(e) => handleEducationChange(edu.id, 'graduationDate', e.target.value)} />
                                <Input label="GPA" placeholder="e.g. 3.8/4.0" value={edu.gpa} onChange={(e) => handleEducationChange(edu.id, 'gpa', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-mono font-bold uppercase mb-2">Description (Optional)</label>
                                <textarea 
                                    value={edu.description} 
                                    onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                                    placeholder="Relevant coursework, honors, etc."
                                    className="w-full border-2 border-brand-dark bg-white px-4 py-2 font-body text-brand-dark min-h-[60px] focus:outline-none focus:ring-2 focus:ring-brand-yellow" 
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={addEducation}>
                    + Add Education
                </Button>
            </section>

            {/* Projects Section */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-blue)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Projects</h2>
                <p className="font-mono text-sm text-brand-dark/70 mb-4">Add relevant technical projects.</p>
                {(data.projects || []).map((proj, index) => (
                    <div key={proj.id} className="mb-6 pb-6 border-b-2 border-brand-dark/20 last:border-0 last:mb-0 last:pb-0 relative group">
                        <Button 
                            variant="outline" 
                            className="absolute top-0 right-0 px-2 py-1 text-xs border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => removeProject(proj.id)}
                        >
                            DELETE
                        </Button>
                        <h3 className="font-mono-title font-bold text-md mb-4 text-brand-dark">Project {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Project Title" value={proj.title} onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)} />
                            <Input label="Link" value={proj.link} placeholder="e.g. github.com/user/repo" onChange={(e) => handleProjectChange(proj.id, 'link', e.target.value)} />
                            <div className="md:col-span-2">
                                <label className="block text-sm font-mono font-bold uppercase mb-2">Description</label>
                                <textarea 
                                    value={proj.description} 
                                    onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                                    className="w-full border-2 border-brand-dark bg-white px-4 py-2 font-body text-brand-dark min-h-[80px] focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={addProject}>
                    + Add Project
                </Button>
            </section>

            {/* Skills Section */}
            <section className="bg-white border-2 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-green)] p-6">
                <h2 className="font-mono-title text-xl font-bold uppercase mb-4 border-b-2 border-brand-dark pb-2">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {data.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1 bg-brand-light border-2 border-brand-dark group cursor-pointer hover:bg-red-100 transition-colors" onClick={() => removeSkill(skill)}>
                            <span className="font-mono text-xs font-bold uppercase">
                                {skill}
                            </span>
                            <span className="text-red-500 font-bold opacity-50 group-hover:opacity-100">&times;</span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input 
                            placeholder="Add a new skill (e.g. React) and press Enter" 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={addSkill}
                        />
                    </div>
                    <Button variant="outline" onClick={addSkill} className="shrink-0">+</Button>
                </div>
            </section>

        </div>
    );
}
