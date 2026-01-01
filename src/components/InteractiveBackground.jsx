import { useRef, useEffect } from 'react';

const InteractiveBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let mouseX = -2000;
        let mouseY = -2000;

        // Configuration
        const PARTICLE_COUNT = 800;
        const PARTICLES = [];
        const FOCAL_LENGTH = 400;
        const BASE_RADIUS = 280; // Main sphere radius

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                // Spherical coordinates for 'Home' position
                const phi = Math.acos(Math.random() * 2 - 1);
                const theta = Math.random() * Math.PI * 2;
                const r = BASE_RADIUS * Math.pow(Math.random(), 0.5);

                // Origin position (where it wants to be)
                this.ox = r * Math.sin(phi) * Math.cos(theta);
                this.oy = r * Math.sin(phi) * Math.sin(theta);
                this.oz = r * Math.cos(phi);

                // Current position
                this.x = this.ox;
                this.y = this.oy;
                this.z = this.oz;

                // Velocity
                this.vx = 0;
                this.vy = 0;
                this.vz = 0;

                // Physics constants
                this.stiffness = 0.02 + Math.random() * 0.02;
                this.damping = 0.9 + Math.random() * 0.05;

                // Appearance
                this.baseLength = Math.random() * 4 + 2;
                this.thickness = 1.2;
                this.opacity = Math.random() * 0.5 + 0.3;

                // Float phase
                this.floatPhase = Math.random() * Math.PI * 2;
                this.floatSpeed = 0.01 + Math.random() * 0.02;
            }

            update(rotationAngleX, rotationAngleY, time) {
                // 1. Calculate Floating State (Antigravity oscillation)
                const floatOffset = Math.sin(time * this.floatSpeed + this.floatPhase) * 10;
                const targetX = this.ox;
                const targetY = this.oy + floatOffset;
                const targetZ = this.oz;

                // 2. Apply "Magnetic Snapping" / Spring logic to origin
                const fx = (targetX - this.x) * this.stiffness;
                const fy = (targetY - this.y) * this.stiffness;
                const fz = (targetZ - this.z) * this.stiffness;

                this.vx += fx;
                this.vy += fy;
                this.vz += fz;

                // 3. Mouse Interaction (Repulsion)
                // Project current position to 2D
                const scale = FOCAL_LENGTH / (this.z + FOCAL_LENGTH);
                const px = width / 2 + this.x * scale;
                const py = height / 2 + this.y * scale;

                const dx = mouseX - px;
                const dy = mouseY - py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 150;

                if (dist < repulsionRadius) {
                    const force = (repulsionRadius - dist) / repulsionRadius;
                    const angle = Math.atan2(dy, dx);

                    // Push away in 3D (influence x and y mostly)
                    this.vx -= Math.cos(angle) * force * 2;
                    this.vy -= Math.sin(angle) * force * 2;
                }

                // 4. Inertia & Friction
                this.vx *= this.damping;
                this.vy *= this.damping;
                this.vz *= this.damping;

                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;

                // 5. Automatic Rotation of the whole system
                const cosX = Math.cos(rotationAngleX);
                const sinX = Math.sin(rotationAngleX);
                const cosY = Math.cos(rotationAngleY);
                const sinY = Math.sin(rotationAngleY);

                // Rotate origin to maintain the structure
                let tox = this.ox * cosY - this.oz * sinY;
                let toz = this.ox * sinY + this.oz * cosY;
                this.ox = tox;
                this.oz = toz;

                let toy = this.oy * cosX - this.oz * sinX;
                toz = this.oy * sinX + this.oz * cosX;
                this.oy = toy;
                this.oz = toz;
            }

            draw(ctx, color) {
                const scale = FOCAL_LENGTH / (this.z + FOCAL_LENGTH);
                const px = width / 2 + this.x * scale;
                const py = height / 2 + this.y * scale;

                if (px < 0 || px > width || py < 0 || py > height) return;

                const depthAlpha = (this.z + BASE_RADIUS) / (BASE_RADIUS * 2);
                ctx.globalAlpha = this.opacity * depthAlpha * scale;

                ctx.save();
                ctx.translate(px, py);

                // Orient towards movement vector for natural feel
                const angle = Math.atan2(this.vy, this.vx);
                ctx.rotate(angle || Math.atan2(this.y, this.x));

                ctx.fillStyle = color;
                const length = this.baseLength * scale * (1 + Math.sqrt(this.vx ** 2 + this.vy ** 2) * 0.5);
                ctx.fillRect(-length / 2, -this.thickness / 2, length, this.thickness);

                ctx.restore();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            PARTICLES.push(new Particle());
        }

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const rotX = 0.001;
        const rotY = 0.0015;
        let time = 0;

        const draw = () => {
            time++;
            ctx.clearRect(0, 0, width, height);

            const computedStyle = getComputedStyle(document.body);
            const accentColor = computedStyle.getPropertyValue('--accent-color').trim() || '#4285F4';

            PARTICLES.forEach(p => {
                p.update(rotX, rotY, time);
                p.draw(ctx, accentColor);
            });

            requestAnimationFrame(draw);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        const animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};

export default InteractiveBackground;
