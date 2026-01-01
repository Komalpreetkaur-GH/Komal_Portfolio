import React, { useState, useEffect, useRef } from 'react';
import '../styles/InteractiveAvatar.css';

class Shard {
    constructor(canvas, x, y, isBurst = false) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;

        // Random jagged shape points
        this.size = Math.random() * 4 + 2; // Reduced from 8+4
        this.points = [];
        const corners = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < corners; i++) {
            const angle = (i / corners) * Math.PI * 2;
            const dist = this.size * (0.5 + Math.random() * 1.5);
            this.points.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist
            });
        }

        // Physics
        // For burst, restrict to 4th quadrant (0 to PI/2) -> Bottom-Right
        const angle = isBurst ? (Math.random() * Math.PI * 0.5) : (Math.random() * Math.PI * 2);
        const speed = isBurst ? (Math.random() * 15 + 8) : (Math.random() * 2 + 1); // Increased speed
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.rotation = Math.random() * Math.PI * 2;
        this.vr = (Math.random() - 0.5) * 0.2;
        this.life = 1.0;
        this.decay = isBurst ? (Math.random() * 0.008 + 0.005) : (Math.random() * 0.02 + 0.01); // Slower decay for burst to spread further
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
        this.vx *= 0.98; // Friction
        this.rotation += this.vr;
        this.life -= this.decay;
    }

    draw(ctx, shardColor = 'black') {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();
        // Use the passed color with the shard's life for opacity
        ctx.fillStyle = `rgba(0, 0, 0, ${this.life})`;
        ctx.fill();
        ctx.restore();
    }
}

const InteractiveAvatar = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const shardsRef = useRef([]);
    const [isHovered, setIsHovered] = useState(false);

    // List of avatar images - Using the user's provided set from public/ folder
    const images = [
        '/avatar1.jpeg',
        '/avatar2.jpeg',
        '/avatar3.jpeg',
        '/avatar4.jpeg',
        '/avatar5.jpeg',
        '/avatar6.jpeg',
        '/avatar7.jpeg',
        '/avatar8.jpeg',
        '/avatar9.jpeg',
        '/avatar10.jpeg',
        '/avatar11.jpeg',
        '/avatar12.jpeg'
    ];
    const [imgIndex, setImgIndex] = useState(0);

    const frameColors = ['#00adef', '#ff0055', '#33ff00', '#ffaa00', '#cc00ff', '#00ffff'];
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            shardsRef.current = shardsRef.current.filter(shard => {
                shard.update();
                // Pass the current dynamic color to shards
                shard.draw(ctx, frameColors[colorIndex]);
                return shard.life > 0;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [colorIndex]);

    const handleBurst = () => {
        // Change image and frame color on click
        setImgIndex((prev) => (prev + 1) % images.length);
        setColorIndex((prev) => (prev + 1) % frameColors.length);

        const rect = containerRef.current.getBoundingClientRect();
        for (let i = 0; i < 35; i++) { // Increased from 20 to 35
            shardsRef.current.push(new Shard(
                canvasRef.current,
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                true
            ));
        }
    };

    return (
        <>
            <canvas ref={canvasRef} className="avatar-shards-canvas" />
            <div
                ref={containerRef}
                className="interactive-avatar-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleBurst}
            >
                <div
                    className="avatar-frame"
                    style={{
                        borderColor: frameColors[colorIndex],
                        boxShadow: `0 0 15px ${frameColors[colorIndex]}33`
                    }}
                >
                    <img
                        src={images[imgIndex]}
                        alt="Avatar"
                        className="avatar-image"
                        key={imgIndex} // Key ensures re-animation if needed
                    />
                </div>
            </div>
        </>
    );
};

export default InteractiveAvatar;
