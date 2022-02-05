import React from 'react';
import { useState, useEffect } from 'react';
import useKeyboardTimer from 'use-keyboard-timer';
import { nanoid } from 'nanoid';

import { getTimes, saveTime } from './utils/storageTools';
import useDidMountEffect from './utils/useDidMountEffect';
import millisecondsToSeconds from './utils/millisecondsToSeconds';

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
  shouldTimerReload: boolean;
}

const Timer = ({
  eventName,
  setShouldScrambleUpdate,
  scrambleString,
  shouldTimerReload,
}: TimerProps) => {
  const defaultPreviousTime: PuzzleSolve = {
    eventName: eventName,
    time: 0.0,
    penalty: undefined,
    scramble: 'DEFAULT',
    solveId: 'DEFAULT',
  };
  const [previousTime, setPreviousTime] = useState<PuzzleSolve>(defaultPreviousTime);

  useEffect(() => {
    const times = getTimes(eventName);
    if (times) {
      setPreviousTime(times[times.length - 1]);
    } else {
      setPreviousTime(defaultPreviousTime);
    }
  }, [eventName, shouldTimerReload]);

  const keyboardTimerCallback = (time: number, penalty: Penalty): void => {
    saveTime(eventName, time, penalty, scrambleString, nanoid());
    setPreviousTime({
      eventName: eventName,
      time: time,
      penalty: penalty,
      scramble: scrambleString,
      solveId: nanoid(),
    });
  };

  const { time, inspectionTime, state, isTiming, dnf, plusTwo } = useKeyboardTimer(
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
        return <p className="unselectable">{renderTime(previousTime)}</p>;

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
      <h1 style={{ fontSize: '10em', padding: '20px', margin: '5px' }}>
        <strong>{renderTimer()}</strong>
      </h1>
    </div>
  );
};

export default Timer;
