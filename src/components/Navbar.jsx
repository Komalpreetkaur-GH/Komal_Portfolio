import React from 'react';
import InteractiveAvatar from './InteractiveAvatar';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme, activeIndex = 0 }) => {
    // Each strip is 60px wide
    const basePadding = 0; // The navbar itself has 20px padding defined in CSS
    // We only need to add the strip width offset
    // activeIndex 0 -> 0 strips -> 0px extra
    // activeIndex 1 -> 1 strip -> 60px extra
    // activeIndex 2 -> 2 strips -> 120px extra
    const leftOffset = activeIndex * 60;

    return (
        <nav className="navbar">
            <div
                className="nav-brand"
                style={{
                    transform: `translateX(${leftOffset}px)`,
                    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
            >
                <InteractiveAvatar theme={theme} />
            </div>
            <div className="nav-links">
                {/* Theme toggle replaced by PullCord */}
            </div>
        </nav>
    );
};

export default Navbar;
