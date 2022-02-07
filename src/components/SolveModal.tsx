import React, { useState } from 'react';
import useDidMountEffect from './utils/useDidMountEffect';
import { PuzzleSolve, WCAEvent } from '../types';
import millisecondsToSeconds from './utils/millisecondsToSeconds';
import { changePenaltyOfTime, deleteTime } from './utils/storageTools';
import { BiX } from 'react-icons/bi';
import { getTimes } from './utils/storageTools';
import eventNameToFullName from './utils/eventNameToFullName';

export interface SolveModalProps {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  isActive: boolean;
  setIsActive: any;
  setShouldSolvesUpdate?: any; //For SolveModalForAnalytics
  shouldSolvesUpdate?: boolean; //For SolveModalForAnalytics
}

const SolveModal = ({ eventName, solve, isActive, setIsActive, setShouldSolvesUpdate, shouldSolvesUpdate }: SolveModalProps) => { //Needs wrapper to pass in isActive, setIsActive
  const [shouldModalUpdate, setShouldModalUpdate] = useState<boolean>(false); //Used for penalty changes
  const [_solve, setSolve] = useState<PuzzleSolve>(solve);

  useDidMountEffect(() => {
    const updatedSolve = getTimes(eventName)?.filter((time) => time.solveId === solve.solveId);
    console.log(updatedSolve?.[0])
    if (updatedSolve?.[0]) {
      setSolve(updatedSolve[0]);

      if (setShouldSolvesUpdate) { //Analytics implementation
        setShouldSolvesUpdate(!shouldSolvesUpdate)
      }
     }
  }, [shouldModalUpdate]);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-flex-direction-column is-flex-wrap-nowrap is-justify-content-center has-background-white">
            <a style={{ marginLeft: 'auto' }}>
              <BiX color="black" size={40} onClick={() => setIsActive(false)} />
            </a>
            <h2 className="title is-2">{eventNameToFullName(eventName)}</h2>
            <h4 className="title is-4">Time: {millisecondsToSeconds(_solve.time).toFixed(2)}</h4>
            <h4 className="title is-4">Scramble: {_solve.scramble}</h4>
            <h4 className="title is-4">Penalty: {_solve.penalty ? _solve.penalty.type : 'None'}</h4>
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
                    setShouldModalUpdate(!shouldModalUpdate);
                  }}
                >
                  +2
                </a>
              </div>
              <div className="m-3 is-size-3 is-link-dark">
                <a
                  onClick={() => {
                    changePenaltyOfTime(eventName, solve.solveId, { type: 'DNF' });
                    setShouldModalUpdate(!shouldModalUpdate);
                  }}
                >
                  DNF
                </a>
              </div>
              <div className="m-3 is-size-3 is-link-dark">
                <a
                  onClick={() => {
                    deleteTime(eventName, solve.solveId);
                    setIsActive(false);

                    if (setShouldSolvesUpdate) {
                      setShouldSolvesUpdate(!shouldSolvesUpdate);
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
