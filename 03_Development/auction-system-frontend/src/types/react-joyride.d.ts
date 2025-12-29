declare module 'react-joyride' {
  import { ReactNode, CSSProperties } from 'react';

  export interface Step {
    target: string | HTMLElement;
    content: ReactNode;
    title?: ReactNode;
    placement?: 'center' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'auto';
    disableBeacon?: boolean;
    disableOverlay?: boolean;
    spotlightClicks?: boolean;
    isFixed?: boolean;
    styles?: {
      options?: CSSProperties;
      beacon?: CSSProperties;
      beaconInner?: CSSProperties;
      beaconOuter?: CSSProperties;
      spotlight?: CSSProperties;
      tooltip?: CSSProperties;
      tooltipContainer?: CSSProperties;
      button?: CSSProperties;
      buttonNext?: CSSProperties;
      buttonBack?: CSSProperties;
      buttonSkip?: CSSProperties;
      badge?: CSSProperties;
    };
  }

  export interface CallBackProps {
    action: string;
    controlled: boolean;
    index: number;
    lifecycle: 'init' | 'ready' | 'running' | 'paused' | 'finished' | 'error';
    origin: any;
    size: { width: number; height: number };
    status: 'finished' | 'skipped' | 'error';
    step: Step;
    type: string;
  }

  export enum STATUS {
    FINISHED = 'finished',
    SKIPPED = 'skipped',
    ERROR = 'error',
  }

  interface JoyrideProps {
    steps: Step[];
    run?: boolean;
    autoStart?: boolean;
    continuous?: boolean;
    disableCloseOnEsc?: boolean;
    disableOverlay?: boolean;
    disableScrolling?: boolean;
    disableScrollParentFix?: boolean;
    floatProps?: any;
    getHelpers?: (helpers: any) => void;
    hideBackButton?: boolean;
    hideCloseButton?: boolean;
    locale?: any;
    notchPadding?: number;
    onChange?: (data: CallBackProps) => void;
    callback?: (data: CallBackProps) => void;
    scrollDuration?: number;
    scrollOffset?: number;
    scrollToFirstStep?: boolean;
    spotlightClicks?: boolean;
    spotlightPadding?: number;
    styles?: any;
    target?: string;
    tooltipOffset?: number;
    stepIndex?: number;
    showSkipButton?: boolean;
    showProgress?: boolean;
  }

  const Joyride: React.ComponentType<JoyrideProps>;
  export default Joyride;
}

