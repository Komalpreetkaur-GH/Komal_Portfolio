const projects = [
    { id: 1, name: 'Retro Portfolio', desc: 'A Mac OS inspired website built with React.' },
    { id: 2, name: 'E-Commerce App', desc: 'Full stack shopping platform.' },
    { id: 3, name: 'Weather Dashboard', desc: 'Real-time weather data visualization.' }
];

const ProjectsContent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {projects.map(p => (
                <div key={p.id} style={{
                    border: '1px dotted var(--sys-gray-900)',
                    padding: '10px',
                    backgroundColor: '#fff'
                }}>
                    <h4 style={{ marginBottom: '5px' }}>{p.name}</h4>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>{p.desc}</p>
                    <button style={{
                        border: '2px outset var(--sys-gray-100)',
                        background: 'var(--sys-gray-300)',
                        padding: '2px 8px',
                        fontSize: '12px'
                    }}>
                        View Source
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProjectsContent;
