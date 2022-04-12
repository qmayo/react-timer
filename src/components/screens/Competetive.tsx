import React, { useState } from 'react';
import { PuzzleSolve, TimeEntryType, WCAEvent } from '../../types';
import eventNameToFullName from '../utils/eventNameToFullName';
import averageTypeForEvent from '../utils/averageTypeForEvent';
import { FiX } from 'react-icons/fi';
import Timer from '../sections/Timer';
import Scramble from '../scrambles/Scramble';
import ManualTimer from '../sections/ManualTimer';

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

  const getTimeEntryTypeString = (timeEntryType: TimeEntryType): string => {
      switch (timeEntryType) {
          case 'timer':
            return 'Virtual timer';
          case 'manual':
            return "Manual entry";
          case 'stackmat':
            return "Stackmat";
      }
  }

  return (
    <div className={`${hasStarted ? 'fill-window' : 'container has-text-centered '}`}>
        {
            hasStarted
            ? (
                <div className='is-flex is-flex-direction-column is-justify-content-center'>
                    <div>
                    <FiX className='is-pulled-right is-clickable m-3' size={25} onClick={() => {
                            setHasStarted(false);
                        }}
                    />
                    </div>
                    <div className='has-text-centered'>
                    <Scramble
                        eventName={eventName}
                        scrambleString={scrambleString}
                        setScramble={setScramble}
                        shouldScrambleUpdate={shouldScrambleUpdate}
                        setShouldScrambleUpdate={setShouldScrambleUpdate}
                    />
                    </div>
                    {
                        timeEntryType === 'timer'
                        ? (
                            <div id='timer'>
                                <Timer 
                              eventName={eventName}
                              scrambleString={scrambleString}
                              setShouldScrambleUpdate={setShouldScrambleUpdate}
                            />
                            </div>
                        )
                        : (
                            <div className='has-text-centered' id='timer'>
                                <ManualTimer
                                eventName={eventName}
                                scrambleString={scrambleString}
                                setShouldScrambleUpdate={setShouldScrambleUpdate}
                            />
                            </div>
                        )
                    }
                    <div className='is-flex is-justify-content-space-around mt-6'>
                        {
                            completedSolves.map((solve, index) => {
                                <p>
                                {index + 1}:<a>{solve.time}</a>
                                </p>
                            })
                        }
                    </div>
                    </div>
            )
            : (
                <>
                <h5 className='title is-5'>Competetive Session Details: </h5>
                <div>
                    <ul>
                        <li>Event: {eventNameToFullName(eventName)}</li>
                        <li>Average type: {averageTypeForEvent(eventName) === 'avg' ? 'Average of 5' : 'Mean of 3'}</li>
                        <li>Time entry: {getTimeEntryTypeString(timeEntryType)}</li>
                        {
                            timeEntryType !== 'timer' &&
                            (
                                <li>
                                    Use virtual inspection: 
                                    <span className="control ml-1">
                                        <label className="radio">
                                            <input type="radio" name="answer" onClick={() => {
                                                setIsUsingVirtualInspection(true)
                                            }} />
                                            Yes
                                        </label>
                                        <label className="radio">
                                            <input type="radio" name="answer" checked={isUsingVirtualInspection ? false : true} onClick={() => {
                                                setIsUsingVirtualInspection(false)
                                            }} />
                                            No
                                        </label>
                                    </span>
                                </li>
                            )
                        }
                    </ul>
                    <button className="button is-link is-outlined m-4" onClick={() => {
                        setHasStarted(true);
                    }}>Start</button>
                </div>
                </>
            )
        }
    </div>
  )
}

export default Competetive