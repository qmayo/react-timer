import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import SolveModal from '../modals/SolveModal';

interface CompetetiveSolveModalWrapperProps {
    eventName: WCAEvent;
    solve: PuzzleSolve;
}

const CompetetiveSolveModalWrapper = ({ eventName, solve }: CompetetiveSolveModalWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div key={solve.solveId} onClick={() => {
        setIsActive(true);
    }}>
        <SolveModal eventName={eventName} solve={solve} isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

export default CompetetiveSolveModalWrapper