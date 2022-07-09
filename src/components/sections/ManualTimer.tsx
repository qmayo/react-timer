import React, { useState } from 'react';
import HHMMSSDDToMs from '../utils/HHMMSSDDToMs';

interface ManualTimerProps {
  callback: (time: number) => void;
}

const ManualTimer = ({ callback }: ManualTimerProps) => {
  const [time, setTime] = useState<number>(); //HHMMSSDD, not MS

  return (
    <div className="container mt-6 mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (time && time !== 0 && typeof time === 'number') {
            callback(HHMMSSDDToMs(time));
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
    </div>
  );
};

export default ManualTimer;
