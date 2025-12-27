import React, { useEffect, useRef } from 'react';

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    density: number;
    vx: number;
    vy: number;
}

const GlobalSnow: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const snowflakesRef = useRef<Snowflake[]>([]);
    const requestRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const mp = 150; // Max particles
        const particles: Snowflake[] = [];

        for (let i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                density: Math.random() * mp,
                vx: Math.random() * 0.5 - 0.25, // Slight horizontal drift
                vy: Math.random() * 1 + 1,      // Vertical speed
            });
        }
        snowflakesRef.current = particles;

        let angle = 0;

        const update = () => {
            angle += 0.01;
            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Draw and move flakes
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();

            for (let i = 0; i < mp; i++) {
                const p = snowflakesRef.current[i];

                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);

                // Update coordinates
                // Add sinusoidal movement for "sway"
                p.y += Math.cos(angle + p.density) + 1 + p.radius / 2;
                p.x += Math.sin(angle) * 2;

                // Reset if off screen
                if (p.x > width + 5 || p.x < -5 || p.y > height) {
                    if (i % 3 > 0) { // 66.67% of the flakes
                        snowflakesRef.current[i] = {
                            x: Math.random() * width,
                            y: -10,
                            radius: p.radius,
                            density: p.density,
                            vx: p.vx,
                            vy: p.vy
                        };
                    } else {
                        // If the flake exits from the right/left
                        if (Math.sin(angle) > 0) {
                            // Enter from left
                            snowflakesRef.current[i] = { x: -5, y: Math.random() * height, radius: p.radius, density: p.density, vx: p.vx, vy: p.vy };
                        } else {
                            // Enter from right
                            snowflakesRef.current[i] = { x: width + 5, y: Math.random() * height, radius: p.radius, density: p.density, vx: p.vx, vy: p.vy };
                        }
                    }
                }
            }
            ctx.fill();
            requestRef.current = requestAnimationFrame(update);
        };

        update();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none', // Allow clicks to pass through
                zIndex: 9999, // On top of everything
            }}
        />
    );
};

export default GlobalSnow;
