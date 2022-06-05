// IDENTICAL TO SOLVEMODAL EXCEPT PENALTY FUNCTIONS; MAYBE INTEGRATE BOTH INTO DYNAMIC COMPONENT
import React from 'react';
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
  solves: Array<PuzzleSolve>;
  setSolves: (solves: Array<PuzzleSolve>) => void;
}

const CompetetiveSolveModal = ({ eventName, solve, isActive, setIsActive, solves, setSolves }: SolveModalProps) => {
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
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
              <div className="m-3 is-size-5 is-link-dark">
                <a
                  onClick={() => {
                    let targetSolve = solves.find((_solve) => _solve.solveId === solve.solveId); //@ts-ignore
                    let index = solves.indexOf(targetSolve); //@ts-ignore

                    if (targetSolve?.penalty?.type === '+2') {
                      delete targetSolve.penalty;
                      targetSolve.time -= 2000;
                    } else { //@ts-ignore
                      targetSolve.penalty = { type: '+2', amount: 2 }; //@ts-ignore
                      targetSolve.time += 2000;
                    }
                    let copiedSolves = [...solves]; //@ts-ignore
                    copiedSolves[index] = targetSolve;
                    setSolves(copiedSolves); 
                  }}
                >
                  +2
                </a>
              </div>
              <div className="m-3 is-size-5 is-link-dark">
                <a
                  onClick={() => {
                    let targetSolve = solves.find((_solve) => _solve.solveId === solve.solveId); //@ts-ignore
                    let index = solves.indexOf(targetSolve); //@ts-ignore

                    if (targetSolve?.penalty?.type === '+2') {
                        targetSolve.time -= 2000;
                    } else if (targetSolve?.penalty?.type === 'DNF') {
                      delete targetSolve.penalty;
                    } 
                    else {
                        //@ts-ignore
                      targetSolve.penalty = { type: 'DNF' };
                    }
                    let copiedSolves = [...solves]; //@ts-ignore
                    copiedSolves[index] = targetSolve;
                    setSolves(copiedSolves); 
                  }}
                >
                  DNF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetetiveSolveModal;