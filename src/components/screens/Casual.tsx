import React from 'react';
import { useState, useContext } from 'react';
import Timer from '../sections/Timer';
import ManualTimer from '../sections/ManualTimer';
import Scramble from '../scrambles/Scramble';
import avgsAsCards from '../utils/avgsAsCards';
import { WCAEvent, PuzzleAverage, TimeEntryType } from '../../types';
import { changePenaltyOfCurrentTime, deleteCurrentTime, getTimes } from '../utils/storageTools';
import SolvesContext from '../contexts/SolvesContext';

export interface CasualProps {
  eventName: WCAEvent;
  avgsToDisplay: Array<PuzzleAverage>;
  timeEntryType: TimeEntryType;
}

const Casual = ({ eventName, avgsToDisplay, timeEntryType }: CasualProps) => {
  const [scrambleString, setScramble] = useState<string>('');
  const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState<boolean>(false);

  const { updateSolves } = useContext(SolvesContext);

  return (
    <div>
      <div className="container has-text-centered">
        <Scramble
          eventName={eventName}
          scrambleString={scrambleString}
          setScramble={setScramble}
          shouldScrambleUpdate={shouldScrambleUpdate}
          setShouldScrambleUpdate={setShouldScrambleUpdate}
        />
      </div>
      <div className="columns is-vcentered">
        <div className="column has-text-centered">
          <div id="timer">
            {/* id must match targetComponentID in Timer.js */}
            {/* @ts-ignore */}
            {timeEntryType !== 'manual' ? (
              <Timer
                eventName={eventName}
                setShouldScrambleUpdate={setShouldScrambleUpdate}
                scrambleString={scrambleString}
              />
            ) : (
              <ManualTimer
                eventName={eventName}
                setShouldScrambleUpdate={setShouldScrambleUpdate}
                scrambleString={scrambleString}
              />
            )}
          </div>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center mb-6">
            <div className="m-3 is-size-3 is-link-dark">
              <a
                onClick={async () => {
                  changePenaltyOfCurrentTime(eventName, { type: '+2', amount: 2 });
                  updateSolves();
                }}
              >
                +2
              </a>
            </div>
            <div className="m-3 is-size-3 is-link-dark">
              <a
                onClick={() => {
                  changePenaltyOfCurrentTime(eventName, { type: 'DNF' });
                  updateSolves();
                }}
              >
                DNF
              </a>
            </div>
            <div className="m-3 is-size-3 is-link-dark">
              <a
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete your previous time?')) {
                    deleteCurrentTime(eventName);
                    updateSolves();
                  }
                }}
              >
                Delete
              </a>
            </div>
          </div>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-around">
            {avgsAsCards(avgsToDisplay, eventName)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casual;
