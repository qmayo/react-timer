import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import CompetetiveSolveModal from '../modals/CompetetiveSolveModal';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

interface CompetetiveSolveModalWrapperProps {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  index: number; //For display on competetive screen
  solves: Array<PuzzleSolve>;
  setSolves: (solves: Array<PuzzleSolve>) => void;
}

const CompetetiveSolveModalWrapper = ({
  eventName,
  solve,
  index,
  solves,
  setSolves,
}: CompetetiveSolveModalWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div key={solve.solveId}>
      {index + 1}:
      <a
        onClick={() => {
          setIsActive(true);
        }}
      >
        {' '}
        {`${millisecondsToHHMMSSDD(solve.time)} ${solve.penalty ? `(${solve.penalty.type})` : ''}`}
      </a>
      <CompetetiveSolveModal
        eventName={eventName}
        solve={solve}
        isActive={isActive}
        setIsActive={setIsActive}
        solves={solves}
        setSolves={setSolves}
      />
    </div>
  );
};

export default CompetetiveSolveModalWrapper;
