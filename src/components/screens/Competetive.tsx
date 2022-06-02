import React, { useState, useEffect } from 'react';
import { Penalty, PuzzleSolve, TimeEntryType, WCAEvent } from '../../types';
import eventNameToFullName from '../utils/eventNameToFullName';
import averageTypeForEvent from '../utils/averageTypeForEvent';
import { FiX } from 'react-icons/fi';
import Timer from '../sections/Timer';
import Scramble from '../scrambles/Scramble';
import ManualTimer from '../sections/ManualTimer';
import { nanoid } from 'nanoid';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';
import CompetetiveSolveModalWrapper from '../sections/CompetetiveSolveModalWrapper';

interface CompetetiveProps {
  eventName: WCAEvent;
  timeEntryType: TimeEntryType;
}

const Competetive = ({ eventName, timeEntryType }: CompetetiveProps) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isUsingVirtualInspection, setIsUsingVirtualInspection] = useState<boolean>(false);
  const [scrambleString, setScramble] = useState<string>('');
  const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState<boolean>(false);
  const [completedSolves, setCompletedSolves] = useState<Array<PuzzleSolve>>([]);

  useEffect(() => {
    setCompletedSolves([]);
  }, [hasStarted])

  const getTimeEntryTypeString = (timeEntryType: TimeEntryType): string => {
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
  };

  return (
    <div className={`${hasStarted ? 'fill-window' : 'container has-text-centered '}`}>
      {hasStarted ? (
        <div className="is-flex is-flex-direction-column is-justify-content-center">
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
                defaultTime={completedSolves.length > 0 ? (millisecondsToHHMMSSDD(completedSolves[completedSolves.length - 1].time)) : '0.00'} 
                setShouldScrambleUpdate={setShouldScrambleUpdate} 
              />
            </div>
          ) : (
            <div className="has-text-centered" id="timer">
              <ManualTimer
                eventName={eventName}
                scrambleString={scrambleString}
                setShouldScrambleUpdate={setShouldScrambleUpdate}
              />
            </div>
          )}
          <div className="is-flex is-justify-content-center mt-6">
            {completedSolves.map((solve, index) => {
              return (<p className={index !== 0 ? 'ml-6' : ''}>
                <CompetetiveSolveModalWrapper eventName={eventName} solve={completedSolves[index]} />
                {index + 1}:<a> {millisecondsToHHMMSSDD(solve.time)}</a>
              </p>);
            })}
          </div>
        </div>
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
