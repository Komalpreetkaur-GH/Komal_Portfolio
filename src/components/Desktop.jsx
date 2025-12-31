import { useState } from 'react';
import Window from './Window';
import Icon from './Icon';
import AboutContent from './AboutContent';
import ProjectsContent from './ProjectsContent';
import ContactContent from './ContactContent';
import '../styles/Desktop.css';

const Desktop = () => {
    const [windows, setWindows] = useState([
        { id: 'about', title: 'About Me', content: <AboutContent />, isOpen: true, x: 50, y: 50, z: 1 },
        { id: 'projects', title: 'Projects', content: <ProjectsContent />, isOpen: true, x: 400, y: 80, z: 2 },
        { id: 'contact', title: 'Contact', content: <ContactContent />, isOpen: false, x: 150, y: 150, z: 3 }
    ]);

    const [activeWindowId, setActiveWindowId] = useState('about');

    const openWindow = (id) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) return { ...w, isOpen: true, z: getMaxZ() + 1 };
            return w;
        }));
        setActiveWindowId(id);
    };

    const closeWindow = (id) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) return { ...w, isOpen: false };
            return w;
        }));
    };

    const bringToFront = (id) => {
        const maxZ = getMaxZ();
        setWindows(prev => prev.map(w => {
            if (w.id === id) return { ...w, z: maxZ + 1 };
            return w;
        }));
        setActiveWindowId(id);
    };

    const getMaxZ = () => {
        return Math.max(...windows.map(w => w.z), 10);
    };

    return (
        <div className="desktop">
            {/* Icons */}
            <Icon
                label="About Me"
                icon="👨‍💻"
                initialPos={{ x: 20, y: 20 }}
                onClick={() => openWindow('about')}
            />
            <Icon
                label="Projects"
                icon="🚀"
                initialPos={{ x: 20, y: 120 }}
                onClick={() => openWindow('projects')}
            />
            <Icon
                label="Contact"
                icon="📧"
                initialPos={{ x: 20, y: 220 }}
                onClick={() => openWindow('contact')}
            />

            {/* Windows */}
            {windows.map(w => (
                w.isOpen && (
                    <Window
                        key={w.id}
                        title={w.title}
                        initialPos={{ x: w.x, y: w.y }}
                        isActive={activeWindowId === w.id}
                        onFocus={() => bringToFront(w.id)}
                        onClose={() => closeWindow(w.id)}
                    >
                        {w.content}
                    </Window>
                )
            ))}
        </div>
    );
};

export default Desktop;
