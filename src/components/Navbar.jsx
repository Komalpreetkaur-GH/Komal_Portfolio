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
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
