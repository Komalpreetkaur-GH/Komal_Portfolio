import { useRef, useEffect } from 'react';

const InteractiveBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let mouseX = -100;
        let mouseY = -100;

        // Grid Configuration
        const GRID_SPACING = 30; // Distance between dots
        const DOT_RADIUS = 1.5; // Base radius of dots
        const ACTIVE_RADIUS = 120; // Radius of mouse influence
        const SCALE_FACTOR = 2.5; // How much dots grow

        let dots = [];

        class Dot {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.currentRadius = DOT_RADIUS;
                this.targetRadius = DOT_RADIUS;
            }

            update() {
                // Calculate distance to mouse
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Highlight logic
                if (dist < ACTIVE_RADIUS) {
                    // Scale based on proximity (closer = larger)
                    const scale = 1 + (SCALE_FACTOR - 1) * (1 - dist / ACTIVE_RADIUS);
                    this.targetRadius = DOT_RADIUS * scale;
                } else {
                    this.targetRadius = DOT_RADIUS;
                }

                // Smooth transition
                this.currentRadius += (this.targetRadius - this.currentRadius) * 0.1;
            }

            draw(ctx, color) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                // Opacity based on size (larger = more opaque)
                const alpha = 0.2 + (this.currentRadius - DOT_RADIUS) / (DOT_RADIUS * (SCALE_FACTOR - 1)) * 0.4;
                ctx.globalAlpha = alpha;
                ctx.fill();
            }
        }

        const initDots = () => {
            dots = [];
            const cols = Math.ceil(width / GRID_SPACING);
            const rows = Math.ceil(height / GRID_SPACING);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push(new Dot(i * GRID_SPACING + GRID_SPACING / 2, j * GRID_SPACING + GRID_SPACING / 2));
                }
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initDots();
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Determine dot color based on theme
            const dotColor = theme === 'light' ? '#000000' : '#ffffff';

            dots.forEach(dot => {
                dot.update();
                dot.draw(ctx, dotColor);
            });

            requestAnimationFrame(animate);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        const animationId = requestAnimationFrame(animate);

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
