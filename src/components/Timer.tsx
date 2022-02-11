import React from 'react';
import { useState, useEffect, useContext } from 'react';
import useKeyboardTimer from 'use-keyboard-timer';
import { nanoid } from 'nanoid';

import { getTimes, saveTime } from './utils/storageTools';
import useDidMountEffect from './utils/useDidMountEffect';
import millisecondsToSeconds from './utils/millisecondsToSeconds';
import SolvesContext from './contexts/SolvesContext';

import { WCAEvent, Penalty, PuzzleSolve } from '../types/index';

let settings = {
  timerInput: 'timer',
  inspection: 'always',
  timerUpdate: 'deciseconds',
  timeToRelease: 'stackmat',
  targetComponentID: 'timer',
};

export interface TimerProps {
  eventName: WCAEvent;
  setShouldScrambleUpdate: any;
  scrambleString: string;
}

const Timer = ({
  eventName,
  setShouldScrambleUpdate,
  scrambleString,
}: TimerProps) => {
  const { solves, updateSolves } = useContext(SolvesContext);

  useEffect(() => {
    //Just want to re-render
  }, [eventName, solves]);

  const keyboardTimerCallback = (time: number, penalty: Penalty): void => {
    const solveId = nanoid();
    saveTime(eventName, time, penalty, scrambleString, new Date(), solveId);
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
    return time.penalty ? (
      time.penalty.type === 'DNF' ? ( //This is because the time for inspection DNFs defaults to -1, and that would look weird
        <p className="unselectable">DNF</p>
      ) : (
        <p className="unselectable">{`${millisecondsToSeconds(time.time).toFixed(2)} (${
          time.penalty.type
        })`}</p>
      )
    ) : (
      <p className="unselectable">{millisecondsToSeconds(time.time).toFixed(2)}</p>
    );
  };

  const renderTimer = () => {
    //render timer itself
    switch (state) {
      default:
        return <p className="unselectable">{solves ? renderTime(solves[solves.length - 1]) : "0.00"}</p>;

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
        return <p className="unselectable">{millisecondsToSeconds(time).toFixed(2)}</p>;
    }
  };

  return (
    <div
      className={isTiming ? 'fill-window' : ''}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <h1 style={{ fontSize: '12vh', padding: '20px', margin: '5px' }}>
        <strong>{renderTimer()}</strong>
      </h1>
    </div>
  );
};

export default Timer;
