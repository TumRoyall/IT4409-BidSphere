import React from 'react';
import styles from './ReindeerScene.module.css';

const ReindeerScene: React.FC = () => {
  return (
    <div className={styles.sceneContainer}>
      <div className={styles.reindeerWrapper}>
        {/* Animated Wireframe Reindeer */}
        <svg
          width="240"
          height="80"
          viewBox="0 0 240 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.reindeer}
        >
          {/* === SLEIGH & SANTA === */}
          <g transform="translate(0, 0)" className={styles.sleighGroup}>
            {/* Runners */}
            <path d="M10 60 C 10 60, 5 70, 20 70 L 80 70 C 90 70, 100 60, 100 50" stroke="#FDE68A" strokeWidth="2" fill="none" />
            {/* Body */}
            <path d="M20 60 L 80 60 L 90 45 L 80 35 L 10 35 Q 0 50 20 60" stroke="#FDE68A" strokeWidth="2" fill="none" />
            {/* Santa */}
            <g transform="translate(50, 20)" className={styles.santa}>
              <circle cx="0" cy="0" r="7" stroke="#FDE68A" strokeWidth="2" /> {/* Head */}
              <path d="M-10 25 Q 0 5 10 25" stroke="#FDE68A" strokeWidth="2" /> {/* Body */}
              <path d="M5 10 L 40 15" stroke="#FDE68A" strokeWidth="1" /> {/* Reins Arm */}

              {/* Throwing Arm - Animates to throw gifts */}
              <g className={styles.throwingArm}>
                <path d="M0 10 L 20 0" stroke="#FDE68A" strokeWidth="2" />
                <rect x="15" y="-10" width="10" height="10" stroke="#FDE68A" strokeWidth="1.5" fill="none" rx="2" />
              </g>
            </g>
            {/* Sack */}
            <path d="M25 35 Q 25 15 40 35" stroke="#FDE68A" strokeWidth="1.5" />
          </g>

          {/* Reins connecting to Reindeer */}
          <path d="M90 35 Q 110 45 130 50" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 2" className={styles.reins} />

          {/* === REINDEER (Shifted Right) === */}
          <g transform="translate(120, 0)">
            {/* Body Group - Bobs up and down */}
            <g className={styles.bodyGroup}>
              {/* Rear Legs */}
              <path d="M30 40 L30 60 L20 75" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.backLegLeft}`} />
              <path d="M80 40 L80 60 L90 75" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.frontLegLeft}`} />

              {/* Main Body & Head */}
              <path d="M20 40 Q 55 50 90 40" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 40 Q 25 25 30 40" stroke="#FDE68A" strokeWidth="1" />
              <path d="M90 40 L100 25 L90 20 L80 25 L85 35" stroke="#FDE68A" strokeWidth="2" strokeLinejoin="round" />

              {/* Antlers (Glowing) */}
              <path d="M90 20 L90 5 L80 10 M90 10 L100 5" stroke="#D4AF37" strokeWidth="1.5" className={styles.antlers} />

              {/* Front Legs */}
              <path d="M30 40 L35 60 L25 75" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.backLegRight}`} />
              <path d="M80 40 L85 60 L95 75" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.frontLegRight}`} />
            </g>

            {/* Sleigh traces (optional line connecting back) */}
            {/* <path d="M30 40 L-20 45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" /> Removed old trace/adjusted */}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ReindeerScene;
