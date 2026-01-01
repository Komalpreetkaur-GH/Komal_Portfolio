import { useState, useEffect, useRef } from 'react';

/**
 * useMagnetic Hook - Liquid Edition
 * Provides an organic, jelly-like magnetic effect with squash and stretch.
 * 
 * @param {Object} options Configuration options
 * @param {number} options.radius Radius in pixels for magnetic influence
 * @param {number} options.tension Spring tension (stiffness)
 * @param {number} options.friction Spring friction (damping)
 */
export const useMagnetic = ({ radius = 100, tension = 0.15, friction = 0.8 } = {}) => {
    const [state, setState] = useState({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0
    });
    const ref = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const vel = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let animationId;

        const update = () => {
            // Spring Physics
            const ax = (target.current.x - pos.current.x) * tension;
            const ay = (target.current.y - pos.current.y) * tension;

            vel.current.x += ax;
            vel.current.y += ay;
            vel.current.x *= friction;
            vel.current.y *= friction;

            pos.current.x += vel.current.x;
            pos.current.y += vel.current.y;

            // Squash and Stretch Logic
            // Calculate speed for deformation
            const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
            const stretch = Math.min(speed * 0.05, 0.3); // Cap deformation

            // Orientation of moving vector
            const angle = Math.atan2(vel.current.y, vel.current.x);

            setState({
                x: pos.current.x,
                y: pos.current.y,
                scaleX: 1 + stretch,
                scaleY: 1 - stretch * 0.5, // Maintain volume roughly
                rotate: angle * (180 / Math.PI) // Convert to degrees for CSS
            });

            animationId = requestAnimationFrame(update);
        };

        const handleMouseMove = (e) => {
            if (!ref.current) return;

            const { clientX, clientY } = e;
            const rect = ref.current.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = clientX - centerX;
            const dy = centerY - clientY; // Relative to center
            const dist = Math.sqrt(dx * dx + (clientY - centerY) ** 2);

            if (dist < radius) {
                // Non-linear "Magnetic" pull
                const power = Math.pow(1 - dist / radius, 1.5);
                target.current = {
                    x: dx * power * 0.6,
                    y: (clientY - centerY) * power * 0.6
                };
            } else {
                target.current = { x: 0, y: 0 };
            }
        };

        const handleMouseLeave = () => {
            target.current = { x: 0, y: 0 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [radius, tension, friction]);

    const style = {
        transform: `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rotate}deg) scale(${state.scaleX}, ${state.scaleY})`,
        willChange: 'transform'
    };

    return { ref, style };
};
