import React from 'react';
import InteractiveAvatar from './InteractiveAvatar';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <InteractiveAvatar />
            </div>
            <div className="nav-links">
                {/* Theme toggle replaced by PullCord */}
            </div>
        </nav>
    );
};

export default Navbar;
