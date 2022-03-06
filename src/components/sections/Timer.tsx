import React from 'react';
import { useContext } from 'react';
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
  eventName: WCAEvent;
  setShouldScrambleUpdate: any;
  scrambleString: string;
}

const Timer = ({ eventName, setShouldScrambleUpdate, scrambleString }: TimerProps) => {
  const { solves, updateSolves } = useContext(SolvesContext);

  const keyboardTimerCallback = (time: number, penalty: Penalty): void => {
    const solveId = nanoid();
    saveSolve(eventName, time, penalty, scrambleString, new Date(), solveId);
    updateSolves();
  };

  const { time, inspectionTime, state, isTiming } = useKeyboardTimer(
    settings,
    keyboardTimerCallback
  );

  useDidMountEffect(() => {
    if (state === 'NONE' || state === 'STOPPED') {
      setShouldScrambleUpdate(true);
    } else {
      setShouldScrambleUpdate(false);
    }
  }, [state]);

  const renderTime = (time: PuzzleSolve) => {
    if (time.penalty) {
      return time.penalty.type === 'DNF' ? (
        <p className="unselectable">DNF</p>
      ) : (
        <p className="unselectable">{`${millisecondsToHHMMSSDD(time.time)} (${
          time.penalty.type
        })`}</p>
      );
    } else {
      return <p className="unselectable">{millisecondsToHHMMSSDD(time.time)}</p>;
    }
  };

  const renderTimer = () => {
    //render timer itself
    switch (state) {
      default:
        return (
          <p className="unselectable">{solves ? renderTime(solves[solves.length - 1]) : '0.00'}</p>
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
