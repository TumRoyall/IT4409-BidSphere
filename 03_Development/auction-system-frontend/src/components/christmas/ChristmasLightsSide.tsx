import React, { useMemo } from 'react';
import styles from './ChristmasLightsSide.module.css';

interface LightProps {
    color: string;
    cx: number;
    cy: number;
    delay: string;
}

const COLORS = ["#ffffff", "#00ffff", "#ffd700", "#1e90ff", "#e0ffff"]; // White, Cyan, Gold, DodgerBlue, LightCyan

const SideLights: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
    const width = 60;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const bulbCount = Math.floor(height / 40);

    // Generate messy wire path and bulb positions
    const { pathD, bulbs } = useMemo(() => {
        let d = `M ${side === 'left' ? 10 : width - 10} 0`;
        const generatedBulbs: LightProps[] = [];
        let currentX = side === 'left' ? 10 : width - 10;

        for (let i = 0; i < bulbCount; i++) {
            const y = (i + 1) * 45;
            // Random wiggle for wire
            const nextX = (side === 'left' ? 10 : width - 10) + (Math.random() * 20 - 10);
            const cpY = y - 20; // Control point Y

            // Curve to next point
            d += ` Q ${currentX} ${cpY}, ${nextX} ${y}`;

            generatedBulbs.push({
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                cx: nextX,
                cy: y,
                delay: `${Math.random() * 2}s`
            });

            currentX = nextX;
        }

        return { pathD: d, bulbs: generatedBulbs };
    }, [side, height, bulbCount]);

    return (
        <svg
            className={side === 'left' ? styles.sideLeft : styles.sideRight}
            width={width}
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
        >
            {/* Wire */}
            <path d={pathD} stroke="#0e3c26" strokeWidth="0.5" fill="none" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.3))" />

            {/* Bulbs */}
            {bulbs.map((bulb, i) => (
                <g key={i}>
                    {/* Socket */}
                    <rect x={bulb.cx - 2} y={bulb.cy - 5} width="4" height="4" fill="#0e3c26" />
                    {/* Bulb */}
                    <circle
                        cx={bulb.cx}
                        cy={bulb.cy + 4}
                        r="7"
                        fill={bulb.color}
                        className={styles.bulb}
                        style={{ animationDelay: bulb.delay, '--bulb-color': bulb.color } as React.CSSProperties}
                    />
                </g>
            ))}
        </svg>
    );
};

const ChristmasLightsSide: React.FC = () => {
    return (
        <div className={styles.container}>
            <SideLights side="left" />
            <SideLights side="right" />
        </div>
    );
};

export default ChristmasLightsSide;
