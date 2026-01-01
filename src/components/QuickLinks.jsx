import '../styles/QuickLinks.css';

const LinkParams = [
    { label: 'BLOG', url: '#blog' },
    { label: 'PROJECTS', url: '#projects' },
    { label: 'ABOUT', url: '#about' },
    { label: 'CLONE', url: '#clone' }
];

const QuickLinks = () => {
    return (
        <div className="quick-links-bar">
            {LinkParams.map((link, idx) => (
                <a key={idx} href={link.url} className="quick-link-item">
                    <span className="cursor">▶</span>
                    <span>{link.label}</span>
                </a>
            ))}
        </div>
    );
};

export default QuickLinks;
