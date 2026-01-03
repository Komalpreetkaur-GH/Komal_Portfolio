import React, { useState } from 'react';
import '../styles/Socials.css';
import ResumeModal from './ResumeModal';

const Socials = ({ onProjectsClick }) => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const links = [
        {
            id: 'projects',
            label: 'View Projects',
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            ),
            url: null,
            isLink: true,
            isProject: true
        },
        {
            id: 'resume',
            label: 'Resume',
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            url: '/resume.pdf',
            isLink: true,
            isResume: true
        }
    ];

    const handleLinkClick = (e, link) => {
        if (link.isResume) {
            e.preventDefault();
            setIsResumeOpen(true);
        } else if (link.isProject) {
            e.preventDefault();
            if (onProjectsClick) onProjectsClick();
        }
    };

    return (
        <>
            <div className="socials-container">
                {links.map((link) => (
                    link.isLink ? (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-item link"
                            title={link.label}
                            onClick={(e) => handleLinkClick(e, link)}
                        >
                            {link.icon}
                            <span className="social-label">{link.label}</span>
                        </a>
                    ) : (
                        <div key={link.id} className="social-item" title={link.label}>
                            {link.icon}
                            <span className="social-label">{link.label}</span>
                        </div>
                    )
                ))}
            </div>
            <ResumeModal
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
                resumeUrl="/resume.pdf"
            />
        </>
    );
};

export default Socials;
