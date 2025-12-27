import React from 'react';
import styles from './ReindeerScene.module.css';

const ReindeerScene: React.FC = () => {
  return (
    <div className={styles.sceneContainer}>
      <div className={styles.reindeerWrapper}>
        {/* Animated Wireframe Reindeer */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.reindeer}
        >
          {/* Body Group - Bobs up and down */}
          <g className={styles.bodyGroup}>
            {/* Rear Legs */}
            <path d="M30 40 L30 60 L20 75" stroke="white" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.backLegLeft}`} />
            <path d="M80 40 L80 60 L90 75" stroke="white" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.frontLegLeft}`} />

            {/* Main Body & Head */}
            <path d="M20 40 Q 55 50 90 40" stroke="white" strokeWidth="2" strokeLinecap="round" /> {/* Spine */}
            <path d="M20 40 Q 25 25 30 40" stroke="white" strokeWidth="1" /> {/* Tail area */}
            <path d="M90 40 L100 25 L90 20 L80 25 L85 35" stroke="white" strokeWidth="2" strokeLinejoin="round" /> {/* Head */}

            {/* Antlers (Glowing) */}
            <path d="M90 20 L90 5 L80 10 M90 10 L100 5" stroke="#D4AF37" strokeWidth="1.5" className={styles.antlers} />

            {/* Front Legs */}
            <path d="M30 40 L35 60 L25 75" stroke="white" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.backLegRight}`} />
            <path d="M80 40 L85 60 L95 75" stroke="white" strokeWidth="2" strokeLinecap="round" className={`${styles.leg} ${styles.frontLegRight}`} />
          </g>

          {/* Sleigh traces (optional line connecting back) */}
          <path d="M30 40 L-20 45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

export default ReindeerScene;
