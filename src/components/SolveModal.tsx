import React, { useContext } from 'react';
import useDidMountEffect from './utils/useDidMountEffect';
import { PuzzleSolve, WCAEvent } from '../types';
import millisecondsToSeconds from './utils/millisecondsToSeconds';
import { changePenaltyOfTime, deleteTime } from './utils/storageTools';
import { BiX } from 'react-icons/bi';
import SolvesContext from './contexts/SolvesContext';
import eventNameToFullName from './utils/eventNameToFullName';

export interface SolveModalProps {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  isActive: boolean;
  setIsActive: any;
}

const SolveModal = ({
  eventName,
  solve,
  isActive,
  setIsActive,
}: SolveModalProps) => {
  const { updateSolves } = useContext(SolvesContext);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setIsActive(false)}></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-flex-direction-column is-flex-wrap-nowrap is-justify-content-center has-background-white">
            <a style={{ marginLeft: 'auto' }}>
              <BiX color="black" size={40} onClick={() => setIsActive(false)} />
            </a>
            <h2 className="title is-2">{eventNameToFullName(eventName)}</h2>
            <h4 className="title is-4">Time: {millisecondsToSeconds(solve.time).toFixed(2) + (solve.penalty ? ` (${solve.penalty.type})`)}</h4>
            <h4 className="title is-4">Scramble: {solve.scramble}</h4>
            <h4 className="title is-4">Penalty: {solve.penalty ? solve.penalty.type : 'None'}</h4>
            <h4 className="title is-4">
              Timestamp:{' '}
              {new Date(solve.date).toLocaleTimeString() +
                ' ' +
                new Date(solve.date).toLocaleDateString()}
            </h4>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
              <div className="m-3 is-size-3 is-link-dark">
                <a
                  onClick={() => {
                    changePenaltyOfTime(eventName, solve.solveId, { type: '+2', amount: 2 });
                    updateSolves();
                  }}
                >
                  +2
                </a>
              </div>
              <div className="m-3 is-size-3 is-link-dark">
                <a
                  onClick={() => {
                    changePenaltyOfTime(eventName, solve.solveId, { type: 'DNF' });
                    updateSolves();
                  }}
                >
                  DNF
                </a>
              </div>
              <div className="m-3 is-size-3 is-link-dark">
                <a
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your previous time?')) {
                      deleteTime(eventName, solve.solveId);
                      updateSolves();
                      setIsActive(false);
                    }
                  }}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolveModal;
