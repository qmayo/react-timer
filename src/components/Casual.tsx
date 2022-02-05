import React from 'react';
import { useState } from 'react';
import Timer from './Timer';
import Card from './Card';
import Scramble from './scrambles/Scramble';
import avgsAsCards from './utils/avgsAsCards';
import { WCAEvent, PuzzleAverage } from '../types';
import { changePenaltyOfCurrentTime, deleteCurrentTime } from './utils/storageTools';

export interface CasualProps {
  eventName: WCAEvent;
  avgsToDisplay: Array<PuzzleAverage>;
}

const Casual = ({ eventName, avgsToDisplay }: CasualProps) => {
  const [scrambleString, setScramble] = useState<string>('');
  const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState<boolean>(false);
  const [shouldTimerReload, setShouldTimerReload] = useState<boolean>(false); //Might need to update if e. g. penalties are changed

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
            {' '}
            {/* id must match targetComponentID in Timer.js */}
            <Timer
              eventName={eventName}
              setShouldScrambleUpdate={setShouldScrambleUpdate}
              scrambleString={scrambleString}
              shouldTimerReload={shouldTimerReload}
            />
          </div>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center mb-6">
            <div className="m-3 is-size-3 is-link-dark">
              <a
                onClick={async () => {
                  changePenaltyOfCurrentTime(eventName, { type: '+2', amount: 2 });
                  setShouldTimerReload(!shouldTimerReload);
                }}
              >
                +2
              </a>
            </div>
            <div className="m-3 is-size-3 is-link-dark">
              <a
                onClick={() => {
                  changePenaltyOfCurrentTime(eventName, { type: 'DNF' });
                  setShouldTimerReload(!shouldTimerReload);
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
                    setShouldTimerReload(!shouldTimerReload);
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
