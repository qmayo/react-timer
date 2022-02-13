import React, { useContext, useEffect, useState } from 'react';
import { Penalty, WCAEvent } from '../../types';
import SolvesContext from '../contexts/SolvesContext';
import useDidMountEffect from '../utils/useDidMountEffect';
import { saveTime } from '../utils/storageTools';
import { nanoid } from 'nanoid';

export interface ManualTimerProps {
  eventName: WCAEvent;
  setShouldScrambleUpdate: any;
  scrambleString: string;
}

const ManualTimer = ({ eventName, setShouldScrambleUpdate, scrambleString }: ManualTimerProps) => {
  const [time, setTime] = useState<number | null>(null);

  const { solves, updateSolves } = useContext(SolvesContext);

  useEffect(() => {
    //Just want to re-render
  }, [eventName]);

  useDidMountEffect(() => {
    setShouldScrambleUpdate(true);
    setShouldScrambleUpdate(false);
  }, [solves]);

  return (
    <div className="container mt-6 mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (time && time !== 0) {
            const solveId = nanoid();
            saveTime(
              eventName,
              time,
              undefined as unknown as Penalty,
              scrambleString,
              new Date(),
              solveId
            );
            updateSolves();
            setTime(null)
          }
        }}
      >
        <input
          className="Large input"
          placeholder="Enter Solve Time"
          type="text"
          value={time ? time : ''}
          onChange={(e) => {
            const parsedInput =  e.target.value.replace('/\D/[e]/','');
            setTime(parseInt(parsedInput));
          }}
        />
      </form>
      {/* <div className="mt-6">
        <small>
          <b>Previous Time: {solves && solves[solves.length - 1].time}</b>
        </small>
      </div> */}
    </div>
  );
};

export default ManualTimer;