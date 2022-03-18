import React, { useState, useContext } from 'react';
import { PuzzleSolve, AverageType, WCAEvent } from '../../types';
import SolvesContext from '../contexts/SolvesContext';
import { deleteSolve } from '../utils/storageTools';
import { FiTrash, FiXCircle, FiList } from 'react-icons/fi';
import AnalyticsSolveModalWrapper from './AnalyticsSolveModalWrapper';
import { getAllMeans, getAllAvgs } from '../utils/sessionStatisticsTools';
import AnalyticsAverageModalWrapper from './AnalyticsAverageModalWrapper';
import { nanoid } from 'nanoid';

interface AnalyticsTableProps {
  eventName: WCAEvent;
  display: 'solve' | AverageType;
  averageSize: number; //Size of mean OR avg
}

const AnalyticsTable = ({ eventName, display, averageSize = 5 }: AnalyticsTableProps) => {
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
      {display === 'solve' && (
        <div className="container has-text-left">
          <hr />
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
          <hr />
        </div>
      )}
      <div className="table-container">
        <table className="table is-striped is-hoverable is-narrow is-fullwidth">
          <thead>
            {display === 'solve' && (
              <>
                <th />
                <th className="title is-5">Time</th>
                <th className="title is-5">Scramble</th>
              </>
            )}
            {display !== 'solve' &&
              (display === 'avg' ? (
                <>
                  <th className="title is-5">Ao{averageSize}</th>
                  <th className="title is-5">Solves</th>
                </>
              ) : (
                <>
                  <th className="title is-5">Mo{averageSize}</th>
                  <th className="title is-5">Solves</th>
                </>
              ))}
          </thead>
          <tbody>
            {display === 'solve' &&
              solves &&
              solves
                .map((solve) => {
                  return (
                    <AnalyticsSolveModalWrapper
                      key={solve.solveId}
                      eventName={eventName}
                      solveIsSelected={isSolveSelected(solve.solveId)}
                      solve={solve}
                      selectSolve={selectSolve}
                      deselectSolve={deselectSolve}
                    />
                  );
                })
                .reverse()}
            {display === 'avg' &&
              solves &&
              getAllAvgs(solves, averageSize)
                ?.map((avg) => {
                  return (
                    <AnalyticsAverageModalWrapper
                      key={nanoid(10)}
                      eventName={eventName}
                      averageType={display}
                      average={avg}
                    />
                  );
                })
                .reverse()}
            {display === 'mean' &&
              solves &&
              getAllMeans(solves, averageSize)
                ?.map((mean) => {
                  return (
                    <AnalyticsAverageModalWrapper
                      key={nanoid(10)}
                      eventName={eventName}
                      averageType={display}
                      average={mean}
                    />
                  );
                })
                .reverse()}
          </tbody>
        </table>
      </div>
      {!solves && <h5 className="title is-5">No Data Available</h5>}
    </div>
  );
};

export default AnalyticsTable;
