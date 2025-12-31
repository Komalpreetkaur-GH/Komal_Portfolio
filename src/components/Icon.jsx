import '../styles/Icon.css';

const Icon = ({ label, icon, onClick, initialPos }) => {
    return (
        <div
            className="desktop-icon"
            style={{ left: initialPos?.x || 20, top: initialPos?.y || 20 }}
            onDoubleClick={onClick}
        >
            <div className="icon-img">{icon || '📁'}</div>
            <div className="icon-label">
                <span>{label}</span>
            </div>
        </div>
    );
};

export default Icon;
