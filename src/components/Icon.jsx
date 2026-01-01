import { useMagnetic } from '../hooks/useMagnetic';
import '../styles/Icon.css';

const Icon = ({ label, icon, onClick, initialPos }) => {
    const { ref, style } = useMagnetic({ radius: 120, tension: 0.1, friction: 0.85 });

    return (
        <div
            ref={ref}
            className="desktop-icon"
            style={{
                left: initialPos?.x || 20,
                top: initialPos?.y || 20,
                ...style
            }}
            onDoubleClick={onClick}
        >
            <div className="icon-img">{icon || '📁'}</div>
            <div className="icon-label" style={{ transitionDelay: '0.05s' }}>
                <span>{label}</span>
            </div>
        </div>
    );
};

export default Icon;
