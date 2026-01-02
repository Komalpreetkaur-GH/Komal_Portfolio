import React, { useState } from 'react';
import '../styles/PullCord.css';

const PullCord = ({ toggleTheme, theme, style }) => {
    const [isPulling, setIsPulling] = useState(false);

    const handleClick = () => {
        if (isPulling) return;

        setIsPulling(true);

        // Trigger theme change halfway through animation
        setTimeout(() => {
            toggleTheme();
        }, 300);

        // Reset state after animation completes
        setTimeout(() => {
            setIsPulling(false);
        }, 1000);
    };

    return (
        <div className="pull-cord-container" style={style}>
            <div
                className={`cord-wrapper ${isPulling ? 'pulled' : ''}`}
                onClick={handleClick}
                title="Pull to switch theme"
            >
                <div className="cord-line"></div>
                <div className="cord-handle">
                    <div className="handle-knob"></div>
                </div>
            </div>
        </div>
    );
};

export default PullCord;
