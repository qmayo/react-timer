import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';
import SolveModal from '../modals/SolveModal';

interface SolveModalForAnalytics {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  solveIsSelected: boolean;
  selectSolve: (solveId: PuzzleSolve['solveId']) => void;
  deselectSolve: (solveId: PuzzleSolve['solveId']) => void;
}

const AnalyticsSolveModalWrapper = ({
  eventName,
  solve,
  solveIsSelected,
  selectSolve,
  deselectSolve,
}: SolveModalForAnalytics) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <React.Fragment key={solve.solveId}>
      <tr
        onClick={() => {
          setIsActive(true);
        }}
      >
        <td className="is-size-5" style={{ width: '5%' }}>
          <input
            type="checkbox"
            className="checkbox"
            checked={solveIsSelected}
            onChange={(e) => {
              e.target.checked ? selectSolve(solve.solveId) : deselectSolve(solve.solveId);
            }}
            onClick={(e) => {
              e.stopPropagation(); //Dont open modal
            }}
          />
        </td>
        <td className="is-size-5" style={{ width: '30%' }}>
          {millisecondsToHHMMSSDD(solve.time) +
            (solve.penalty && solve.time !== -1 ? ` (${solve.penalty.type})` : '')}
        </td>
        <td className="is-size-5" style={{ width: '65%' }}>
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

export default AnalyticsSolveModalWrapper;
