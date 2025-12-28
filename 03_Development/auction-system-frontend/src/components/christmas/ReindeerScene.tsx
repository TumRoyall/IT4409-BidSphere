import React from 'react';
import styles from './ReindeerScene.module.css';

const ReindeerScene: React.FC = () => {
  return (
    <div className={styles.sceneContainer}>
      <div className={styles.reindeerWrapper}>
        <svg
          width="420"
          height="100"
          viewBox="0 0 420 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.reindeer}
        >
          <defs>
            {/* Gradients for realistic shading */}
            <linearGradient id="sleighGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#654321" />
            </linearGradient>
            <linearGradient id="santaCoat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="reindeerBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A0826D" />
              <stop offset="100%" stopColor="#8B6F47" />
            </linearGradient>
          </defs>

          {/* === SLEIGH & SANTA === */}
          <g transform="translate(0, 0)" className={styles.sleighGroup}>
            {/* Sleigh Runners (curved metal) */}
            <path d="M10 65 Q 5 70, 15 72 L 85 72 Q 95 70, 100 60 L 98 58 Q 93 68, 83 70 L 17 70 Q 7 68, 12 63 Z"
              fill="#C0C0C0" stroke="#808080" strokeWidth="1" />

            {/* Sleigh Body */}
            <path d="M15 60 L 85 60 L 92 45 Q 93 40, 88 38 L 12 38 Q 8 40, 10 45 Z"
              fill="url(#sleighGrad)" stroke="#654321" strokeWidth="1.5" />

            {/* Sleigh decorative trim */}
            <rect x="12" y="42" width="76" height="3" fill="#D4AF37" rx="1" />

            {/* Gift Sack in sleigh */}
            <ellipse cx="30" cy="45" rx="12" ry="15" fill="#8B4513" stroke="#654321" strokeWidth="1" />
            <path d="M25 35 Q 30 30, 35 35" stroke="#654321" strokeWidth="2" fill="none" />

            {/* Santa */}
            <g transform="translate(60, 25)" className={styles.santa}>
              {/* Body (red coat) */}
              <ellipse cx="0" cy="15" rx="10" ry="18" fill="url(#santaCoat)" />

              {/* Belt */}
              <rect x="-10" y="18" width="20" height="4" fill="#1F1F1F" />
              <rect x="-3" y="17" width="6" height="6" fill="#D4AF37" rx="1" />

              {/* Head */}
              <circle cx="0" cy="-2" r="8" fill="#FFDAB9" />

              {/* Hat */}
              <path d="M-8 -2 L -6 -12 L 6 -12 L 8 -2 Z" fill="url(#santaCoat)" />
              <ellipse cx="0" cy="-12" rx="3" ry="3" fill="#FFFFFF" />
              <rect x="-8" y="-3" width="16" height="2" fill="#FFFFFF" />

              {/* Beard */}
              <path d="M-6 2 Q -8 6, -5 8 Q 0 10, 5 8 Q 8 6, 6 2 Z" fill="#FFFFFF" />

              {/* Eyes */}
              <circle cx="-3" cy="-1" r="1" fill="#000000" />
              <circle cx="3" cy="-1" r="1" fill="#000000" />

              {/* Throwing Arm with gift */}
              <g className={styles.throwingArm}>
                <path d="M8 10 L 18 5" stroke="url(#santaCoat)" strokeWidth="4" strokeLinecap="round" />
                <rect x="16" y="-2" width="8" height="8" fill="#D4AF37" stroke="#B8860B" strokeWidth="1" rx="1" />
                <path d="M20 -2 L 20 6 M16 2 L 24 2" stroke="#B8860B" strokeWidth="1" />
              </g>
            </g>
          </g>

          {/* Reins */}
          <path d="M95 45 Q 115 50, 140 52" stroke="#654321" strokeWidth="1.5" strokeDasharray="3 2" className={styles.reins} />

          {/* === REINDEER === */}
          <g transform="translate(130, 0)">
            <g className={styles.bodyGroup}>
              {/* Main Body */}
              <ellipse cx="55" cy="45" rx="35" ry="18" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />

              {/* Neck */}
              <path d="M75 40 Q 85 35, 90 30" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />
              <ellipse cx="85" cy="35" rx="8" ry="12" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />

              {/* Head */}
              <ellipse cx="95" cy="25" rx="10" ry="8" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />
              <ellipse cx="102" cy="24" rx="6" ry="5" fill="#A0826D" /> {/* Snout */}

              {/* Nose (red) */}
              <circle cx="106" cy="24" r="3" fill="#E63946" />

              {/* Eye */}
              <circle cx="96" cy="22" r="2" fill="#000000" />

              {/* Antlers */}
              <g className={styles.antlers}>
                <path d="M92 18 L 90 8 M90 12 L 85 10 M90 8 L 95 6" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                <path d="M98 18 L 100 8 M100 12 L 105 10 M100 8 L 95 6" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Legs - Back Left */}
              <g className={`${styles.leg} ${styles.backLegLeft}`}>
                <rect x="35" y="58" width="6" height="18" rx="3" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />
                <ellipse cx="38" cy="76" rx="4" ry="2" fill="#4A3C28" />
              </g>

              {/* Legs - Back Right */}
              <g className={`${styles.leg} ${styles.backLegRight}`}>
                <rect x="45" y="58" width="6" height="18" rx="3" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />
                <ellipse cx="48" cy="76" rx="4" ry="2" fill="#4A3C28" />
              </g>

              {/* Legs - Front Left */}
              <g className={`${styles.leg} ${styles.frontLegLeft}`}>
                <rect x="65" y="58" width="6" height="18" rx="3" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />
                <ellipse cx="68" cy="76" rx="4" ry="2" fill="#4A3C28" />
              </g>

              {/* Legs - Front Right */}
              <g className={`${styles.leg} ${styles.frontLegRight}`}>
                <rect x="75" y="58" width="6" height="18" rx="3" fill="url(#reindeerBody)" stroke="#6B5A3D" strokeWidth="1" />
                <ellipse cx="78" cy="76" rx="4" ry="2" fill="#4A3C28" />
              </g>

              {/* Tail */}
              <path d="M25 45 Q 18 40, 20 35" stroke="#8B6F47" strokeWidth="4" strokeLinecap="round" />
            </g>
          </g>
          {/* === GIFT TRAIL === */}
          <g className={styles.giftTrail}>
            {/* Gift 1 */}
            <g transform="translate(-20, 55)">
              <rect x="0" y="0" width="8" height="8" fill="#E63946" stroke="#B91C1C" strokeWidth="0.5" rx="1" />
              <path d="M4 0 L 4 8 M0 4 L 8 4" stroke="#D4AF37" strokeWidth="1" />
            </g>

            {/* Gift 2 */}
            <g transform="translate(-35, 50)">
              <rect x="0" y="0" width="7" height="7" fill="#4CAF50" stroke="#2E7D32" strokeWidth="0.5" rx="1" />
              <path d="M3.5 0 L 3.5 7 M0 3.5 L 7 3.5" stroke="#FFD700" strokeWidth="0.8" />
            </g>

            {/* Gift 3 */}
            <g transform="translate(-48, 58)">
              <rect x="0" y="0" width="6" height="6" fill="#2196F3" stroke="#1565C0" strokeWidth="0.5" rx="1" />
              <path d="M3 0 L 3 6 M0 3 L 6 3" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>

            {/* Gift 4 */}
            <g transform="translate(-60, 53)">
              <rect x="0" y="0" width="7" height="7" fill="#FF9800" stroke="#E65100" strokeWidth="0.5" rx="1" />
              <path d="M3.5 0 L 3.5 7 M0 3.5 L 7 3.5" stroke="#D4AF37" strokeWidth="0.8" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ReindeerScene;
