import { useState, useEffect } from 'react';
import '../styles/Menubar.css';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="menubar-clock">
            {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        </div>
    );
};

const Menubar = () => {
    return (
        <div className="menubar">
            <div className="menubar-left">
                <div className="menubar-item apple-logo"></div>
                <div className="menubar-item active">File</div>
                <div className="menubar-item">Edit</div>
                <div className="menubar-item">View</div>
                <div className="menubar-item">Special</div>
            </div>
            <div className="menubar-right">
                <Clock />
            </div>
        </div>
    );
};

export default Menubar;
