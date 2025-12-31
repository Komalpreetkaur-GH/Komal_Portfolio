import { useDraggable } from '../hooks/useDraggable';
import '../styles/Window.css';

const Window = ({ title, children, onClose, initialPos, isActive, onFocus }) => {
    const { position, handleMouseDown, nodeRef } = useDraggable(initialPos || { x: 50, y: 50 });

    return (
        <div
            className={`window ${isActive ? 'active' : ''}`}
            style={{ left: position.x, top: position.y, zIndex: isActive ? 100 : 10 }}
            onMouseDown={onFocus}
        >
            <div
                className="title-bar"
                ref={nodeRef}
                onMouseDown={handleMouseDown}
            >
                <div className="close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
                <div className="title-text">{title}</div>
                <div className="title-lines"></div>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
};

export default Window;
