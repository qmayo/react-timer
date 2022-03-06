import React, { useContext, useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import AnalyticsSolveModalWrapper from '../sections/AnalyticsSolveModalWrapper';
import eventNameToFullName from '../utils/eventNameToFullName';
import SolvesContext from '../contexts/SolvesContext';
import SearchAverages from '../sections/SearchAverages';
import { deleteSolve } from '../utils/storageTools';
import { FiTrash, FiXCircle } from 'react-icons/fi';

interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  const { solves, updateSolves } = useContext(SolvesContext);
  const [selectedSolves, setSelectedSolves] = useState<Array<PuzzleSolve["solveId"]>>([]);

  const selectSolve = (solveId: PuzzleSolve["solveId"]) => {
    setSelectedSolves([...selectedSolves, solveId]);
  }

  const deselectSolve = (solveId: PuzzleSolve["solveId"]) => {
    console.log('deselecting...')
    let newSelectedSolves = selectedSolves;
    newSelectedSolves = newSelectedSolves.filter((solve) => {
      return solve !== solveId;
    });
    setSelectedSolves(newSelectedSolves);
  }

  const deleteSelectedSolves = () => {
    selectedSolves.forEach((solve) => {
      deleteSolve(eventName, solve); //'solve' is already the solveId
    })
  }

  return (
    <div>
      <div className="container has-text-centered">
        <h1 className="title is-1">{eventNameToFullName(eventName)}</h1>
        {/* <SearchAverages eventName={eventName} /> */}
        <div className='container has-text-left' style={(selectedSolves.length === 0) ? { visibility: "hidden" } : {}}>
          <FiXCircle className='is-clickable' />
          <FiTrash className='is-clickable ml-5' />
        </div>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <th />
            <th className="title is-5">Time</th>
            <th className="title is-5">Scramble</th>
          </thead>
          <tbody>
            {solves &&
              solves.map((solve) => {
                return <AnalyticsSolveModalWrapper eventName={eventName} solve={solve} selectSolve={selectSolve} deselectSolve={deselectSolve} />;
              })}
          </tbody>
        </table>
        {!solves && <h5 className="title is-5">No Data Available</h5>}
      </div>
    </div>
  );
};

export default Analytics;
