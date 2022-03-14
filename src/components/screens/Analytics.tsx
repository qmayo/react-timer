import React, { useContext, useState } from 'react';
import { PuzzleSolve, WCAEvent } from '../../types';
import AnalyticsSolveModalWrapper from '../sections/AnalyticsSolveModalWrapper';
import eventNameToFullName from '../utils/eventNameToFullName';
import SolvesContext from '../contexts/SolvesContext';
import SearchAverages from '../sections/SearchAverages';
import { deleteSolve } from '../utils/storageTools';
import { FiTrash, FiXCircle, FiList } from 'react-icons/fi';

interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  const { solves, updateSolves } = useContext(SolvesContext);
  const [selectedSolves, setSelectedSolves] = useState<Array<PuzzleSolve['solveId']>>([]);

  const selectSolve = (solveId: PuzzleSolve['solveId']) => {
    setSelectedSolves([...selectedSolves, solveId]);
  };

  const selectAllSolves = () => {
    if (solves) {
      setSelectedSolves(solves.map((solve) => solve.solveId));
    }
  };

  const deselectSolve = (solveId: PuzzleSolve['solveId']) => {
    let newSelectedSolves = selectedSolves;
    newSelectedSolves = newSelectedSolves.filter((solve) => {
      return solve !== solveId;
    });
    setSelectedSolves(newSelectedSolves);
  };

  const deleteSelectedSolves = () => {
    selectedSolves.forEach((solveId: PuzzleSolve['solveId']) => {
      deleteSolve(eventName, solveId); //'solve' is already the solveId
    });
    setSelectedSolves([]);
    updateSolves();
  };

  const isSolveSelected = (solveId: PuzzleSolve['solveId']) => {
    return selectedSolves.includes(solveId) ? true : false;
  };

  return (
    <div>
      <div className="container has-text-centered">
        <h1 className="title is-1">{eventNameToFullName(eventName)}</h1>
        {/* <SearchAverages eventName={eventName} /> */}
        <div className="container has-text-left">
          <FiXCircle
            className="is-clickable ml-3"
            title="Deselect solves"
            onClick={() => {
              setSelectedSolves([]);
            }}
          />
          <FiList
            className="is-clickable ml-5"
            title="Select all solves"
            onClick={() => {
              selectAllSolves();
            }}
          />
          <FiTrash
            className="is-clickable ml-5"
            title="Delete selected solves"
            onClick={() => {
              if (
                selectedSolves.length > 0 &&
                window.confirm('Are you sure you want to delete all of the selected solves?')
              ) {
                deleteSelectedSolves();
              }
            }}
          />
        </div>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <th />
            <th className="title is-5">Time</th>
            <th className="title is-5">Scramble</th>
          </thead>
          <tbody>
            {solves &&
              solves
                .map((solve) => {
                  return (
                    <AnalyticsSolveModalWrapper
                      eventName={eventName}
                      solveIsSelected={isSolveSelected(solve.solveId)}
                      solve={solve}
                      selectSolve={selectSolve}
                      deselectSolve={deselectSolve}
                    />
                  );
                })
                .reverse()}
          </tbody>
        </table>
        {!solves && <h5 className="title is-5">No Data Available</h5>}
      </div>
    </div>
  );
};

export default Analytics;
