import React from 'react';
import { useContext, useEffect } from 'react';
import useKeyboardTimer from 'use-keyboard-timer';
import SolvesContext from '../contexts/SolvesContext';

import { Penalty, PuzzleSolve } from '../../types';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

let settings = {
  timerInput: 'timer', //TODO: Do work in fork of use-keyboard-timer to enable stackmat timing
  inspection: 'always',
  timerUpdate: 'deciseconds',
  timeToRelease: 'stackmat',
  targetComponentID: 'timer',
};

interface TimerProps {
  mode: 'competetive' | 'casual';
  defaultSolve?: PuzzleSolve; //For competetive mode
  callback: (time: number, penalty: Penalty) => void;
}

const Timer = ({ mode, defaultSolve, callback }: TimerProps) => {
  const { solves } = useContext(SolvesContext);

  const { time, inspectionTime, state, isTiming } = useKeyboardTimer(settings, callback);

  useEffect(() => {
    //Spacebar presses scroll down
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleSpacebar);

    return () => {
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, []);

  const renderTime = (solve: PuzzleSolve) => {
    if (solve.penalty) {
      return solve.penalty.type === 'DNF' ? (
        "DNF"
      ) : (
        `${millisecondsToHHMMSSDD(solve.time)} (${
          solve.penalty.type
        })`
      );
    } else {
      return millisecondsToHHMMSSDD(solve.time);
    }
  };

  const renderTimer = () => {
    //render timer itself
    switch (state) {
      default:
        return ( /* @ts-ignore because code in Competetive.tsx gaurantees defaultSolve is not null/undefined */
          <span className="unselectable">{solves && mode === 'casual' ? renderTime(solves[solves.length - 1]) : renderTime(defaultSolve)}</span>
        );

      case 'SPACE_PRESSED_INSPECTION':
        return (
          <span className="unselectable" style={{ color: 'green' }}>
            15
          </span>
        );
      case 'INSPECTION':
        return <span className="unselectable">{inspectionTime}</span>;

      case 'SPACE_PRESSED_TIMING':
        return (
          <span className="unselectable" style={{ color: 'red' }}>
            0.00
          </span>
        );
      case 'SPACE_PRESSED_VALID':
        return (
          <span className="unselectable" style={{ color: 'green' }}>
            0.00
          </span>
        );
      case 'STARTED':
        return <span className="unselectable">{millisecondsToHHMMSSDD(time)}</span>;
    }
  };

  return (
    <div
      className={
        'is-flex is-justify-content-center is-align-items-center' + (isTiming ? ' fill-window' : '')
      }
    >
      <h1 style={{ fontSize: '12vh', padding: '20px', margin: '5px' }}>
        <strong>{renderTimer()}</strong>
      </h1>
    </div>
  );
};

export default Timer;
