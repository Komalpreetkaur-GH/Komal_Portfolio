import { useState } from 'react';
import Navbar from './Navbar';
import QuickLinks from './QuickLinks';
import RetroCard from './RetroCard';
import '../styles/Home.css';
import '../styles/GameboyPhoto.css';

const Home = ({ theme, toggleTheme }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sections = [
        { id: 'hero', label: 'HOME' },
        { id: 'skills', label: 'SKILLS' },
        { id: 'projects', label: 'QUESTS' }
    ];

    const handleSectionClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="home-container">
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <div className="strip-layout-container">
                {sections.map((section, index) => {
                    const isActive = activeIndex === index;
                    const isBefore = index < activeIndex;
                    const isAfter = index > activeIndex;

                    return (
                        <div
                            key={section.id}
                            className={`strip-section ${isActive ? 'active' : 'strip'} ${isBefore ? 'prev' : ''} ${isAfter ? 'next' : ''}`}
                            onClick={() => !isActive && handleSectionClick(index)}
                        >
                            <div className="strip-label">{section.label}</div>

                            <div className="section-content-wrapper">
                                {index === 0 && (
                                    <section className="hero-section">
                                        <div className="hero-content">
                                            <p className="hero-subtitle">PRESS START TO BEGIN</p>
                                            <h1 className="hero-title">HELLO<br />WORLD</h1>
                                            <br />
                                            <p className="hero-subtitle">
                                                CHARACTER: MAC<br />
                                                LEVEL: 24<br />
                                                CLASS: DEVELOPER
                                            </p>
                                            <br />
                                            <button className="hero-cta" onClick={(e) => { e.stopPropagation(); handleSectionClick(1); }}>CONTINUE ▶</button>
                                        </div>
                                        <div className="hero-image">
                                            <div className="gameboy-photo-container">
                                                <video
                                                    src="/hero-wave.mp4"
                                                    className="gameboy-photo"
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                />
                                                <div className="gameboy-photo-overlay"></div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {index === 1 && (
                                    <section className="quick-links-section">
                                        <h3>SELECT MODE</h3>
                                        <QuickLinks />
                                        <button className="hero-cta" onClick={(e) => { e.stopPropagation(); handleSectionClick(2); }} style={{ marginTop: '50px' }}>VIEW QUEST LOG</button>
                                    </section>
                                )}

                                {index === 2 && (
                                    <section className="projects-section" id="projects">
                                        <h2>QUEST LOG</h2>
                                        <div className="projects-grid">
                                            <RetroCard title="PROJECT 01" date="2020-04-08" onAction={() => { }}>
                                                <div className="card-image-placeholder" style={{ height: '150px', background: 'var(--gb-dark)', opacity: 0.5 }}></div>
                                                <div className="card-text">
                                                    <h3>POSSIMUS</h3>
                                                    <p>A challenging dungeon crawler built with React.</p>
                                                </div>
                                            </RetroCard>

                                            <RetroCard title="PROJECT 02" date="2020-04-08" onAction={() => { }}>
                                                <div className="card-image-placeholder" style={{ height: '150px', background: 'var(--gb-dark)', opacity: 0.5 }}></div>
                                                <div className="card-text">
                                                    <h3>DOLORUM</h3>
                                                    <p>Inventory management system for shops.</p>
                                                </div>
                                            </RetroCard>
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
