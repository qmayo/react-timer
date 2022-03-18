import React, { useContext, useState } from 'react';
import { Penalty, WCAEvent } from '../../types';
import SolvesContext from '../contexts/SolvesContext';
import useDidMountEffect from '../utils/useDidMountEffect';
import { saveSolve } from '../utils/storageTools';
import { nanoid } from 'nanoid';
import HHMMSSDDToMs from '../utils/HHMMSSDDToMs';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

interface ManualTimerProps {
  eventName: WCAEvent;
  setShouldScrambleUpdate: any;
  scrambleString: string;
}

const ManualTimer = ({ eventName, setShouldScrambleUpdate, scrambleString }: ManualTimerProps) => {
  const [time, setTime] = useState<number>(); //HHMMSSDD, not MS

  const { solves, updateSolves } = useContext(SolvesContext);

  useDidMountEffect(() => {
    setShouldScrambleUpdate(true);
  }, [solves]); //TODO: Maybe scramble should be context

  return (
    <div className="container mt-6 mb-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setShouldScrambleUpdate(false);

          if (time && time !== 0 && typeof time === 'number') {
            const solveId = nanoid();
            saveSolve(
              eventName,
              HHMMSSDDToMs(time),
              undefined as unknown as Penalty,
              scrambleString,
              new Date(),
              solveId
            );
            updateSolves();
            setTime(undefined);
          }
        }}
      >
        <input
          className="Large input timer-input"
          style={{ fontSize: '4em' }}
          type="text"
          maxLength={8}
          value={time ? time : ''}
          onChange={(e) => {
            setTime(parseInt(e.target.value));
          }}
        />
      </form>
      <div className="mt-4">
        <small>
          {solves && (
            <b>
              Previous Time:{' '}
              {millisecondsToHHMMSSDD(solves[solves.length - 1].time) +
                ' ' +
                (solves[solves.length - 1]?.penalty
                  ? `(${solves[solves.length - 1]?.penalty?.type})`
                  : '')}
            </b>
          )}
        </small>
      </div>
    </div>
  );
};

export default ManualTimer;
