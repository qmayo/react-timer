import React, { useState, useEffect } from 'react';
import { AverageType, Penalty, PuzzleSolve, TimeEntryType, WCAEvent } from '../../types';
import eventNameToFullName from '../utils/eventNameToFullName';
import averageTypeForEvent from '../utils/averageTypeForEvent';
import { FiX } from 'react-icons/fi';
import Timer from '../sections/Timer';
import Scramble from '../scrambles/Scramble';
import ManualTimer from '../sections/ManualTimer';
import { nanoid } from 'nanoid';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';
import CompetetiveSolveModalWrapper from '../sections/CompetetiveSolveModalWrapper';
import CompetetiveAverageModalWrapper from '../sections/CompetetiveAverageModalWrapper';

interface CompetetiveProps {
  eventName: WCAEvent;
  timeEntryType: TimeEntryType;
}

const Competetive = ({ eventName, timeEntryType }: CompetetiveProps) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [isUsingVirtualInspection, setIsUsingVirtualInspection] = useState<boolean>(false);
  const [scrambleString, setScramble] = useState<string>('');
  const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState<boolean>(false);
  const [completedSolves, setCompletedSolves] = useState<Array<PuzzleSolve>>([]);

  useEffect(() => {
    setCompletedSolves([]);
    setHasEnded(false);
  }, [hasStarted]);

  useEffect(() => {
    if (completedSolves.length === (averageTypeForEvent(eventName) === 'avg' ? 5 : 3)) {
      setHasEnded(true);
    }
    
      
    
  }, [completedSolves]);

  const getTimeEntryTypeString = (timeEntryType: TimeEntryType): string => { /* prob move to utils later */
    switch (timeEntryType) {
      case 'timer':
        return 'Virtual timer';
      case 'manual':
        return 'Manual entry';
      case 'stackmat':
        return 'Stackmat';
    }
  };

  const timerCallback = (time: number, penalty: Penalty) => {
    const solveId = nanoid();
    setCompletedSolves([
      ...completedSolves,
      {
        eventName: eventName,
        time: time,
        penalty: penalty,
        scramble: scrambleString,
        date: new Date(),
        solveId: solveId,
      },
    ]);
    setShouldScrambleUpdate(true);
  };

  const manualTimerCallback = (time: number) => {
    const solveId = nanoid();
    setCompletedSolves([
      ...completedSolves,
      {
        eventName: eventName,
        time: time,
        penalty: undefined,
        scramble: scrambleString,
        date: new Date(),
        solveId: solveId,
      },
    ]);
    setShouldScrambleUpdate(true);
  }

  return (
    <div
      className={`${hasStarted ? 'has-text-centered fill-window' : 'container has-text-centered '}`}
    >
      {hasStarted ? (
        hasEnded ? (
          <div className="is-flex is-flex-direction-column">
            <div>
              <FiX
                className="is-pulled-right is-clickable m-3"
                size={25}
                onClick={() => {
                  setHasStarted(false);
                }}
              />
            </div>
            <h2 className="title is-2">Competetive Results:</h2>
            <div className="is-flex is-justify-content-center mt-6">
              {completedSolves.map((solve, index) => {
                return (
                  
                  <span key={solve.solveId} className={index !== 0 ? 'ml-6' : ''}>
                  <CompetetiveSolveModalWrapper
                    eventName={eventName}
                    solve={solve}
                    index={index}
                    solves={completedSolves}
                    setSolves={setCompletedSolves}
                  />
                </span>
                  
                );
              })}
            </div>
            <div className="mt-6">
              <CompetetiveAverageModalWrapper
                eventName={eventName}
                solves={completedSolves}
                averageType={averageTypeForEvent(eventName)}
              />
            </div>
          </div>
        ) : (
          <div className="is-flex is-flex-direction-column">
            <div>
              <FiX
                className="is-pulled-right is-clickable m-3"
                size={25}
                onClick={() => {
                  setHasStarted(false);
                }}
              />
            </div>
            <div className="has-text-centered">
              <Scramble
                eventName={eventName}
                scrambleString={scrambleString}
                setScramble={setScramble}
                shouldScrambleUpdate={shouldScrambleUpdate}
                setShouldScrambleUpdate={setShouldScrambleUpdate}
              />
            </div>
            {timeEntryType === 'timer' ? (
              <div id="timer">
                <Timer
                  callback={timerCallback}
                  mode={'competetive'}
                  defaultSolve={
                    completedSolves.length > 0
                      ? completedSolves[completedSolves.length - 1]
                      : {
                        eventName: eventName,
                        time: 0,
                        penalty: undefined,
                        scramble: '',
                        date: new Date(),
                        solveId: ''
                      }
                  }
                />
              </div>
            ) : (
              <div className="has-text-centered" id="timer">
                <ManualTimer
                  callback={manualTimerCallback}
                />
              </div>
            )}
            <div className="is-flex is-justify-content-center mt-6">
              {completedSolves.map((solve, index) => {
                return (
                  <span key={solve.solveId} className={index !== 0 ? 'ml-6' : ''}>
                    <CompetetiveSolveModalWrapper
                      eventName={eventName}
                      solve={solve}
                      index={index}
                      solves={completedSolves}
                      setSolves={setCompletedSolves}
                    />
                  </span>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <>
          <h5 className="title is-5">Competetive Session Details: </h5>
          <div>
            <ul>
              <li>Event: {eventNameToFullName(eventName)}</li>
              <li>
                Average type:{' '}
                {averageTypeForEvent(eventName) === 'avg' ? 'Average of 5' : 'Mean of 3'}
              </li>
              <li>Time entry: {getTimeEntryTypeString(timeEntryType)}</li>
              {timeEntryType !== 'timer' && (
                <li>
                  Use virtual inspection:
                  <span className="control ml-1">
                    <label className="radio">
                      <input
                        type="radio"
                        name="answer"
                        onClick={() => {
                          setIsUsingVirtualInspection(true);
                        }}
                      />
                      Yes
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="answer"
                        checked={isUsingVirtualInspection ? false : true}
                        onClick={() => {
                          setIsUsingVirtualInspection(false);
                        }}
                      />
                      No
                    </label>
                  </span>
                </li>
              )}
            </ul>
            <button
              className="button is-link is-outlined m-4"
              onClick={() => {
                setHasStarted(true);
              }}
            >
              Start
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Competetive;
