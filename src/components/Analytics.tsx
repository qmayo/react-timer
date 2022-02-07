import React, { useEffect, useState } from 'react';
import { WCAEvent, PuzzleSolve } from '../types';
import { getTimes } from './utils/storageTools';
import SolveModalForAnalytics from './SolveModalForAnalytics';
import millisecondsToSeconds from './utils/millisecondsToSeconds';

export interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  const [solves, setSolves] = useState<PuzzleSolve[]>(null as unknown as PuzzleSolve[]);
  const [shouldSolvesUpdate, setShouldSolvesUpdate] = useState<boolean>(false); //Like alot of other states like this, value doesnt matter. IDK what else to do but this works

  useEffect(() => {
    const solves = getTimes(eventName);
    solves ? setSolves(solves) : setSolves(null as unknown as PuzzleSolve[]);
  }, [eventName, shouldSolvesUpdate]);

  return (
    <div>
      <div className="container has-text-centered">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <th className="title is-5">Time</th>
            <th className="title is-5">Scramble</th>
          </thead>
          <tbody>
            {solves &&
              solves.map((solve) => {
                return <SolveModalForAnalytics setShouldSolvesUpdate={setShouldSolvesUpdate} sholdSolvesUpdate={shouldSolvesUpdate} eventName={eventName} solve={solve} />
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
