import React, { useState } from 'react';
import { TimeEntryType, WCAEvent } from '../../types';
import eventNameToFullName from '../utils/eventNameToFullName';
import averageTypeForEvent from '../utils/averageTypeForEvent';

interface CompetetiveProps {
    eventName: WCAEvent;
    timeEntryType: TimeEntryType;
}

const Competetive = ({ eventName, timeEntryType }: CompetetiveProps) => {
  //const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [useVirtualInspection, setUseVirtualInspection] = useState<boolean>(false);

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
    <div className=''>
        <div className='columns is-vcentered'>
            <div className='column has-text-centered'>
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
                                                setUseVirtualInspection(true)
                                            }} />
                                            Yes
                                        </label>
                                        <label className="radio">
                                            <input type="radio" name="answer" checked={useVirtualInspection ? false : true} onClick={() => {
                                                setUseVirtualInspection(false)
                                            }} />
                                            No
                                        </label>
                                    </span>
                                </li>
                            )
                        }
                    </ul>
                    <button className="button is-link is-outlined m-4">Start</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Competetive