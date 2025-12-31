import '../styles/global.css'; // Ensure we have access to vars if needed specific styles

const AboutContent = () => {
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
                width: '100%',
                height: '150px',
                backgroundColor: '#ccc',
                border: '1px inset black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                [Profile Picture]
            </div>
            <div>
                <h3>Hello, World!</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.4' }}>
                    I'm a Full Stack Developer passionate about building unique web experiences.
                    This portfolio is designed to look like a retro Macintosh desktop.
                </p>
                <p style={{ marginTop: '10px', lineHeight: '1.4' }}>
                    Feel free to drag these windows around and explore my work!
                </p>
            </div>
        </div>
    );
};

export default AboutContent;
