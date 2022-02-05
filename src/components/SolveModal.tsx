import React, { useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../types';
import millisecondsToSeconds from './utils/millisecondsToSeconds';
import { changePenaltyOfTime, deleteTime } from './utils/storageTools';
import { BiX } from 'react-icons/bi';

export interface SolveModalProps {
  eventName: WCAEvent;
  solve: PuzzleSolve;
  isActive: boolean;
  setIsActive: any;
}

const SolveModal = ({ eventName, solve, isActive, setIsActive }: SolveModalProps) => {
  const [shouldModalUpdate, setShouldModalUpdate] = useState<boolean>(false);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`} key={solve.solveId}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-flex-direction-column is-flex-wrap-nowrap is-justify-content-center has-background-white">
          <a style={{marginLeft: 'auto' }}>
            <BiX
              color="black"
              size={40}
              onClick={() => setIsActive(false)}
            />
          </a>
            <h2 className="title is-2">Event: {eventName}</h2>
            <h4 className="title is-4">Time: {millisecondsToSeconds(solve.time).toFixed(2)}</h4>
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
