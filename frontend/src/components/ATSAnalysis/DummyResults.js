export const dummyAnalysisResult = {
    score: 78,
    summary: "Your resume is generally strong and well-formatted, but it lacks some key technical terms required for this specific role. Tailoring your experience section to highlight these missing skills will significantly improve your chances.",
    matchedKeywords: [
        "React", "Node.js", "Javascript", "Frontend Development", "API Integration", "Agile", "Git"
    ],
    missingKeywords: [
        "TypeScript", "GraphQL", "Docker", "CI/CD", "AWS", "Unit Testing", "Microservices"
    ],
    structuralAnalysis: {
        readability: "Excellent",
        length: "Good (1 page)",
        bulletPoints: "Needs Improvement (Use clear action verbs)",
        contactInfo: "Complete"
    },
    recommendations: [
        "Add 'TypeScript' to your skills and try to incorporate it into a bullet point in your experience section if applicable.",
        "Your bullets could be more impactful. Try rewriting them to focus on achievements rather than responsibilities (e.g., 'Increased performance by X%' instead of 'Responsible for performance').",
        "The job description heavily emphasizes testing. Mention any experience you have with Jest, Cypress, or general unit testing methodologies.",
        "Consider adding a short summary section at the top of your resume to quickly grab the recruiter's attention."
    ]
};
