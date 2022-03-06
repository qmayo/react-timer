import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';
import SolveModal from '../modals/SolveModal';
import { deleteSolve } from '../utils/storageTools';

export interface SolveModalForAnalytics {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  selectSolve: (solveId: PuzzleSolve["solveId"]) => void;
  deselectSolve: (solveId: PuzzleSolve["solveId"]) => void;
}

const AnalyticsSolveModalWrapper = ({ eventName, solve, selectSolve, deselectSolve }: SolveModalForAnalytics) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [checkboxIsChecked, setCheckboxIsChecked] = useState<boolean>(false);

  return (
    <React.Fragment key={solve.solveId}>
      <tr
        onClick={() => {
          setIsActive(true);
        }}
      >
        <td className='is-size-5' style={{ width: "5%" }}>
          <input 
            type="checkbox" 
            className="checkbox" 
            checked={checkboxIsChecked} 
            onChange={(e) => {
              e.target.checked ? selectSolve(solve.solveId) : deselectSolve(solve.solveId);
              setCheckboxIsChecked(e.target.checked);
            }} 
            onClick={(e) => {
              e.stopPropagation(); //Dont open modal
            }}
          />
        </td>
        <td className="is-size-5" style={{ width: '30%' }}>
          {solve.time !== -1 //Check DNF
            ? millisecondsToHHMMSSDD(solve.time) +
              (solve.penalty ? ` (${solve.penalty.type})` : '')
            : 'DNF'}
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
