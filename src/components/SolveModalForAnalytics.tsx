import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../types';
import millisecondsToSeconds from './utils/millisecondsToSeconds';
import SolveModal from './SolveModal';

export interface SolveModalForAnalytics {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  setShouldSolvesUpdate: any;
  sholdSolvesUpdate: boolean;
}

const SolveModalForAnalytics = ({ eventName, solve, setShouldSolvesUpdate, sholdSolvesUpdate }: SolveModalForAnalytics) => { //FOR ANALYTICS PAGE
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <React.Fragment key={solve.solveId}>
      <tr onClick={() => {
        setIsActive(true)
      }}>
        <td className="is-size-5" style={{width: "25%"}}>
          {millisecondsToSeconds(solve.time).toFixed(2) + (solve.penalty ? ` (${solve.penalty.type})` : '')}
        </td>
        <td className="is-size-5" style={{width: "75%"}}>
          {solve.scramble}
        </td>
      </tr>
      <SolveModal
        key={solve.solveId}
        eventName={eventName}
        solve={solve}
        isActive={isActive}
        setIsActive={setIsActive}
        setShouldSolvesUpdate={setShouldSolvesUpdate}
        shouldSolvesUpdate={sholdSolvesUpdate}
      />
    </React.Fragment>
  );
};

export default SolveModalForAnalytics;
