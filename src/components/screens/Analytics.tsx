import React, { useContext } from 'react';
import { WCAEvent, PuzzleSolve } from '../../types';
import { getTimes } from '../utils/storageTools';
import SolveModalForAnalytics from '../modals/SolveModalForAnalytics';
import eventNameToFullName from '../utils/eventNameToFullName';
import SolvesContext from '../contexts/SolvesContext';

export interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  const { solves, updateSolves } = useContext(SolvesContext);

  return (
    <div>
      <div className="container has-text-centered">
        <h1 className="title is-1">{eventNameToFullName(eventName)}</h1>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <th className="title is-5">Time</th>
            <th className="title is-5">Scramble</th>
          </thead>
          <tbody>
            {solves &&
              solves.map((solve) => {
                return <SolveModalForAnalytics eventName={eventName} solve={solve} />;
              })}
          </tbody>
        </table>
        {!solves && <h5 className="title is-5">No Data Available</h5>}
      </div>
    </div>
  );
};

export default Analytics;
