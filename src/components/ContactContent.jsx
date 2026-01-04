import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaCalendarAlt } from 'react-icons/fa';

const ContactContent = () => {
    const links = [
        {
            label: "Email",
            icon: <FaEnvelope />,
            url: "mailto:komalpreetkaur.jassal@gmail.com",
            text: "komalpreetkaur.jassal@gmail.com"
        },
        {
            label: "LinkedIn",
            icon: <FaLinkedin />,
            url: "https://www.linkedin.com/in/komalpreet-kaur-jassal", // Replace with actual
            text: "/in/komalpreet-kaur-jassal"
        },
        {
            label: "GitHub",
            icon: <FaGithub />,
            url: "https://github.com/Komalpreetkaur-GH",
            text: "@Komalpreetkaur-GH"
        },
        {
            label: "Schedule a Chat",
            icon: <FaCalendarAlt />,
            url: "#", // Replace with calendly link
            text: "15-min Coffee Chat"
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            textAlign: 'center',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            paddingBottom: '100px' // Space for sticker belt
        }}>
            <p style={{
                fontSize: '18px',
                maxWidth: '400px',
                lineHeight: '1.6',
                margin: '0 auto',
                color: 'var(--text-color)',
                opacity: 0.9
            }}>
                Open to internships, ML roles, and collaborations.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '15px',
                width: '100%',
                maxWidth: '350px'
            }}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 20px',
                            background: 'rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: 'var(--text-color)',
                            transition: 'all 0.3s ease',
                            fontSize: '16px',
                            fontWeight: '500'
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>{link.icon}</span>
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>

            <style jsx>{`
                .contact-btn:hover {
                    background: var(--text-color) !important;
                    color: var(--bg-color) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default ContactContent;
