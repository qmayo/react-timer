import React from 'react';
import { useContext, useEffect } from 'react';
import useKeyboardTimer from 'use-keyboard-timer';
import { nanoid } from 'nanoid';

import { saveSolve } from '../utils/storageTools';
import useDidMountEffect from '../utils/useDidMountEffect';
import SolvesContext from '../contexts/SolvesContext';

import { WCAEvent, Penalty, PuzzleSolve } from '../../types';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

let settings = {
  timerInput: 'timer', //TODO: Do work in fork of use-keyboard-timer to enable stackmat timing
  inspection: 'always',
  timerUpdate: 'deciseconds',
  timeToRelease: 'stackmat',
  targetComponentID: 'timer',
};

interface TimerProps {
  setShouldScrambleUpdate: any;
  mode: 'competetive' | 'casual';
  defaultTime?: string; //For competetive mode
  callback: (time: number, penalty: Penalty) => void;
}

const Timer = ({ setShouldScrambleUpdate, mode, defaultTime = '0.00', callback }: TimerProps) => {
  const { solves } = useContext(SolvesContext);

  const { time, inspectionTime, state, isTiming } = useKeyboardTimer(settings, callback);

  useEffect(() => {
    //Spacebard presses scroll down
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
        <p className="unselectable">DNF</p>
      ) : (
        <p className="unselectable">{`${millisecondsToHHMMSSDD(solve.time)} (${
          solve.penalty.type
        })`}</p>
      );
    } else {
      return <p className="unselectable">{millisecondsToHHMMSSDD(solve.time)}</p>;
    }
  };

  const renderTimer = () => {
    //render timer itself
    switch (state) {
      default:
        return (
          <p className="unselectable">{solves && mode === 'casual' ? renderTime(solves[solves.length - 1]) : defaultTime}</p>
        );

      case 'SPACE_PRESSED_INSPECTION':
        return (
          <p className="unselectable" style={{ color: 'green' }}>
            15
          </p>
        );
      case 'INSPECTION':
        return <p className="unselectable">{inspectionTime}</p>;

      case 'SPACE_PRESSED_TIMING':
        return (
          <p className="unselectable" style={{ color: 'red' }}>
            0.00
          </p>
        );
      case 'SPACE_PRESSED_VALID':
        return (
          <p className="unselectable" style={{ color: 'green' }}>
            0.00
          </p>
        );
      case 'STARTED':
        return <p className="unselectable">{millisecondsToHHMMSSDD(time)}</p>;
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
