import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import QuickLinks from './QuickLinks';
import Socials from './Socials';
import FooterSocials from './FooterSocials';

import ContactContent from './ContactContent';
import StickerBelt from './StickerBelt';
import PullCord from './PullCord';
import '../styles/Home.css';
import '../styles/GameboyPhoto.css';

const Home = ({ theme, toggleTheme }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const lastScrollTime = useRef(0); // For throttling scroll events

    const sections = [
        { id: 'hero', label: 'HOME' },
        { id: 'skills', label: 'SKILLS' },
        { id: 'contact', label: "LET'S CONNECT" }
    ];

    const [typedText, setTypedText] = useState({ line1: '', line2: '' });

    useEffect(() => {
        const text1 = "KOMALPREET";
        const text2 = "KAUR";
        let i = 0;
        let j = 0;
        let timeoutId;

        const typeLine1 = () => {
            if (i < text1.length) {
                setTypedText(prev => ({ ...prev, line1: text1.slice(0, i + 1) }));
                i++;
                timeoutId = setTimeout(typeLine1, 100);
            } else {
                timeoutId = setTimeout(typeLine2, 100);
            }
        };

        const typeLine2 = () => {
            if (j < text2.length) {
                setTypedText(prev => ({ ...prev, line2: text2.slice(0, j + 1) }));
                j++;
                timeoutId = setTimeout(typeLine2, 100);
            }
        };

        // Start typing after a short delay
        timeoutId = setTimeout(typeLine1, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    const scrollAccumulator = useRef(0); // Aggregate small deltas

    const handleWheel = (e) => {
        // Log to debug if event is firing
        console.log("Wheel event:", e.deltaY, "Accumulator:", scrollAccumulator.current);

        const now = Date.now();

        // Accumulate deltaY
        scrollAccumulator.current += e.deltaY;

        const THRESHOLD = 50;

        // Check if we are in a "cooldown" phase
        if (now - lastScrollTime.current < 500) {
            scrollAccumulator.current = 0;
            return;
        }

        if (scrollAccumulator.current > THRESHOLD) {
            // Scroll Down -> Next Section
            if (activeIndex < sections.length - 1) {
                console.log("Navigating NEXT");
                setActiveIndex(prev => prev + 1);
                lastScrollTime.current = now;
                scrollAccumulator.current = 0;
            } else {
                scrollAccumulator.current = 0;
            }
        } else if (scrollAccumulator.current < -THRESHOLD) {
            // Scroll Up -> Prev Section
            if (activeIndex > 0) {
                console.log("Navigating PREV");
                setActiveIndex(prev => prev - 1);
                lastScrollTime.current = now;
                scrollAccumulator.current = 0;
            } else {
                scrollAccumulator.current = 0;
            }
        }
    };

    const handleSectionClick = (index) => {
        setActiveIndex(index);
    };

    // Calculate position for PullCord to stay clear of right-side strips
    // 60px per strip. Gap of 30px (150px start - 120px strips).
    const stripsOnRight = sections.length - 1 - activeIndex;
    const rightPos = (stripsOnRight * 60) + 30;

    return (
        <div className="home-container" onWheel={handleWheel}>
            <Navbar theme={theme} toggleTheme={toggleTheme} activeIndex={activeIndex} />
            <PullCord
                toggleTheme={toggleTheme}
                theme={theme}
                style={{ right: rightPos + 'px' }}
            />

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
                                    <>
                                        <section className="hero-section">
                                            <div className="hero-content">
                                                <h3 className="hero-title">{typedText.line1}<br />{typedText.line2}<span className="cursor-blink">|</span></h3>
                                                <br />
                                                <p className="hero-subtitle">
                                                    I’m a 22-year-old engineer from India working across machine learning, data science, and analytics to build data-driven systems.
                                                </p>
                                                <Socials onProjectsClick={() => handleSectionClick(2)} />
                                            </div>
                                            <div className="hero-image">
                                                <div className="gameboy-photo-container">
                                                    <img
                                                        src="/hero-wave.png"
                                                        alt="Hero"
                                                        className="gameboy-photo"
                                                    />
                                                    <div className="gameboy-photo-overlay"></div>
                                                </div>
                                            </div>
                                        </section>
                                        <FooterSocials />
                                    </>
                                )}

                                {index === 1 && (
                                    <section className="quick-links-section">
                                        <h3>SELECT MODE</h3>
                                        <QuickLinks />
                                        <button className="hero-cta" onClick={(e) => { e.stopPropagation(); handleSectionClick(2); }} style={{ marginTop: '50px' }}>LET'S CONNECT</button>
                                    </section>
                                )}

                                {index === 2 && (
                                    <section className="contact-section" id="contact">
                                        <h2>LET'S CONNECT</h2>
                                        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', height: '100%' }}>
                                            <ContactContent />
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '0px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '100%',
                                            maxWidth: '600px',
                                            pointerEvents: 'none' // Ensure clicks pass through wrapper, but catch on children if enabled
                                        }}>
                                            <StickerBelt />
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
};

export default Home;
