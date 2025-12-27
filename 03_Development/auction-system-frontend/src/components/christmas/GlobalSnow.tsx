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
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const mp = 500;
        const particles: Snowflake[] = [];

        for (let i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                density: Math.random() * mp,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 1.5 + 1.5,
            });
        }
        snowflakesRef.current = particles;

        let angle = 0;

        const update = () => {
            angle += 0.01;
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (let i = 0; i < mp; i++) {
                const p = snowflakesRef.current[i];

                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);

                // Natural movement
                p.y += Math.cos(angle + p.density) + 1 + p.radius / 2;
                p.x += Math.sin(angle) * 2;

                // --- Mouse Interaction (Repulsion) ---
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = 150; // Interaction radius

                if (dist < minDist) {
                    const force = (minDist - dist) / minDist; // 0 (far) to 1 (close)
                    const pushAngle = Math.atan2(dy, dx);

                    // Push away
                    const pushX = Math.cos(pushAngle) * force * 8;
                    const pushY = Math.sin(pushAngle) * force * 8;

                    p.x += pushX;
                    p.y += pushY;
                }
                // -------------------------------------

                // Limit horizontal movement to avoid getting stuck
                // Reset if off screen
                if (p.x > width + 5 || p.x < -5 || p.y > height) {
                    if (i % 3 > 0) {
                        snowflakesRef.current[i] = {
                            x: Math.random() * width,
                            y: -10,
                            radius: p.radius,
                            density: p.density,
                            vx: p.vx,
                            vy: p.vy
                        };
                    } else {
                        if (Math.sin(angle) > 0) {
                            snowflakesRef.current[i] = { x: -5, y: Math.random() * height, radius: p.radius, density: p.density, vx: p.vx, vy: p.vy };
                        } else {
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

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove); // Track mouse

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
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
