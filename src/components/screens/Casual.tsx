import React from 'react';
import { useState, useContext } from 'react';
import Timer from '../sections/Timer';
import ManualTimer from '../sections/ManualTimer';
import Scramble from '../scrambles/Scramble';
import AverageCards from '../utils/AverageCards';
import { WCAEvent, PuzzleAverage, TimeEntryType, Penalty } from '../../types';
import { changePenaltyOfCurrentSolve, deleteCurrentSolve, saveSolve } from '../utils/storageTools';
import SolvesContext from '../contexts/SolvesContext';
import { nanoid } from 'nanoid';

interface CasualProps {
  eventName: WCAEvent;
  avgsToDisplay: Array<PuzzleAverage>;
  timeEntryType: TimeEntryType;
}

const Casual = ({ eventName, avgsToDisplay, timeEntryType }: CasualProps) => {
  const [scrambleString, setScramble] = useState<string>('');
  const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState<boolean>(false);

  const { updateSolves } = useContext(SolvesContext);

  const timerCallback = (time: number, penalty: Penalty) => {
    const solveId = nanoid();
    saveSolve(eventName, time, penalty, scrambleString, new Date(), solveId);

    setShouldScrambleUpdate(true);

    updateSolves();
  };

  const manualTimerCallback = (time: number) => {
    const solveId = nanoid();
    saveSolve(
      eventName,
      time,
      undefined as unknown as Penalty,
      scrambleString,
      new Date(),
      solveId
    );

    setShouldScrambleUpdate(true);

    updateSolves();
  };

  return (
    <div>
      <div className="columns is-vcentered">
        <div className="column has-text-centered">
          <Scramble
            eventName={eventName}
            scrambleString={scrambleString}
            setScramble={setScramble}
            shouldScrambleUpdate={shouldScrambleUpdate}
            setShouldScrambleUpdate={setShouldScrambleUpdate}
          />
          <div id="timer">
            {/* id must match targetComponentID in Timer.js */}
            {timeEntryType !== 'manual' ? (
              <Timer mode={'casual'} callback={timerCallback} />
            ) : (
              <ManualTimer callback={manualTimerCallback} />
            )}
          </div>
          <div
            className="mb-6" /* className="is-flex is-flex-wrap-wrap is-justify-content-center" */
          >
            <span className="m-3 is-size-5 is-link-dark">
              <a
                onClick={() => {
                  changePenaltyOfCurrentSolve(eventName, { type: '+2', amount: 2 });
                  updateSolves();
                }}
              >
                +2
              </a>
            </span>
            <span className="m-3 is-size-5 is-link-dark">
              <a
                onClick={() => {
                  changePenaltyOfCurrentSolve(eventName, { type: 'DNF' });
                  updateSolves();
                }}
              >
                DNF
              </a>
            </span>
            <span className="m-3 is-size-5 is-link-dark">
              <a
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete your previous time?')) {
                    deleteCurrentSolve(eventName);
                    updateSolves();
                  }
                }}
              >
                Delete
              </a>
            </span>
          </div>
          <div className="is-flex is-flex-wrap-wrap is-justify-content-space-around">
            {AverageCards(avgsToDisplay, eventName)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casual;
