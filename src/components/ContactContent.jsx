const ContactContent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p>Send me a digital letter:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>To:</label>
                <input
                    type="text"
                    value="me@portfolio.com"
                    disabled
                    style={{
                        border: '1px solid var(--sys-gray-900)',
                        padding: '4px',
                        fontFamily: 'var(--font-mono)'
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Subject:</label>
                <input
                    type="text"
                    style={{
                        border: '1px solid var(--sys-gray-900)',
                        padding: '4px',
                        fontFamily: 'var(--font-mono)'
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Message:</label>
                <textarea
                    rows="5"
                    style={{
                        border: '1px solid var(--sys-gray-900)',
                        padding: '4px',
                        fontFamily: 'var(--font-mono)',
                        resize: 'none'
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button style={{
                    border: '2px outset var(--sys-gray-100)',
                    background: 'var(--sys-gray-300)',
                    padding: '4px 16px',
                    fontWeight: 'bold',
                    active: { borderStyle: 'inset' }
                }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ContactContent;
