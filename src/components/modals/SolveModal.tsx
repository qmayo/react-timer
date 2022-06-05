import React, { useContext } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import { changePenaltyOfSolve, deleteSolve } from '../utils/storageTools';
import { BiX } from 'react-icons/bi';
import SolvesContext from '../contexts/SolvesContext';
import eventNameToFullName from '../utils/eventNameToFullName';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

interface SolveModalProps {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  isActive: boolean;
  setIsActive: any;
}

const SolveModal = ({ eventName, solve, isActive, setIsActive }: SolveModalProps) => {
  const { updateSolves } = useContext(SolvesContext);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setIsActive(false)}></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-flex-direction-column is-flex-wrap-nowrap has-text-centered has-background-white">
            <a style={{ marginLeft: 'auto' }}>
              <BiX color="black" size={40} onClick={() => setIsActive(false)} />
            </a>
            <h2 className="title is-2">{eventNameToFullName(eventName)}</h2>
            <div>
              <p className="is-size-4 m-2">
                Time:{' '}
                {millisecondsToHHMMSSDD(solve.time) +
                  (solve.penalty && solve.time !== -1 ? ` (${solve.penalty.type})` : '')}
              </p>
              <p className="is-size-4 m-2">Scramble: {solve.scramble}</p>
              <p className="is-size-4 m-2">
                Penalty: {solve.penalty ? solve.penalty.type : 'None'}
              </p>
              <p className="is-size-4 m-2">
                Timestamp:{' '}
                {new Date(solve.date).toLocaleTimeString() +
                  ' ' +
                  new Date(solve.date).toLocaleDateString()}
              </p>
            </div>
            <div /* className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center" */>
              <span className="m-3 is-size-5 is-link-dark">
                <a
                  onClick={() => {
                    changePenaltyOfSolve(eventName, solve.solveId, { type: '+2', amount: 2 });
                    updateSolves();
                  }}
                >
                  +2
                </a>
              </span>
              <span className="m-3 is-size-5 is-link-dark">
                <a
                  onClick={() => {
                    changePenaltyOfSolve(eventName, solve.solveId, { type: 'DNF' });
                    updateSolves();
                  }}
                >
                  DNF
                </a>
              </span>
              <span className="m-3 is-size-5 is-link-dark">
                <a
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this solve?')) {
                      deleteSolve(eventName, solve.solveId);
                      updateSolves();
                      setIsActive(false);
                    }
                  }}
                >
                  Delete
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolveModal;
