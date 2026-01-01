import { useState, useEffect } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
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

const MagneticMenubarItem = ({ children, className = "" }) => {
    const { ref, style } = useMagnetic({ radius: 60, tension: 0.2, friction: 0.75 });
    return (
        <div ref={ref} className={`menubar-item ${className}`} style={style}>
            {children}
        </div>
    );
};

const Menubar = () => {
    return (
        <div className="menubar">
            <div className="menubar-left">
                <MagneticMenubarItem className="apple-logo"></MagneticMenubarItem>
                <MagneticMenubarItem className="active">File</MagneticMenubarItem>
                <MagneticMenubarItem>Edit</MagneticMenubarItem>
                <MagneticMenubarItem>View</MagneticMenubarItem>
                <MagneticMenubarItem>Special</MagneticMenubarItem>
            </div>
            <div className="menubar-right">
                <Clock />
            </div>
        </div>
    );
};

export default Menubar;
