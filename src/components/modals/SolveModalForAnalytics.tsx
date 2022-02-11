import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import millisecondsToSeconds from '../utils/millisecondsToSeconds';
import SolveModal from './SolveModal';

export interface SolveModalForAnalytics {
  eventName: WCAEvent;
  solve: PuzzleSolve;
}

const SolveModalForAnalytics = ({ eventName, solve }: SolveModalForAnalytics) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <React.Fragment key={solve.solveId}>
      <tr
        onClick={() => {
          setIsActive(true);
        }}
      >
        <td className="is-size-5" style={{ width: '25%' }}>
          {solve.time !== -1 ? millisecondsToSeconds(solve.time).toFixed(2) +
            (solve.penalty ? ` (${solve.penalty.type})` : '') : "DNF"}
        </td>
        <td className="is-size-5" style={{ width: '75%' }}>
          {solve.scramble}
        </td>
      </tr>
      <SolveModal
        eventName={eventName}
        solve={solve}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </React.Fragment>
  );
};

export default SolveModalForAnalytics;
