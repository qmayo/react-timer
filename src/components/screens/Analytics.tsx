import React, { useState } from 'react';
import eventNameToFullName from '../utils/eventNameToFullName';
import AnalyticsTable from '../sections/AnalyticsTable';
import { AverageType, WCAEvent } from '../../types';

interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  const [display, setDisplay] = useState<'solve' | AverageType>('solve');

  return (
    <div>
      <div className="container has-text-centered">
        <h1 className="title is-1">{eventNameToFullName(eventName)}</h1>
        <div>
          <form className="mb-6" onSubmit={(e) => e.preventDefault}>
            <div className="field has-text-left">
              <h5 className="title is-5 mb-2">Showing:</h5>
              <div className="control">
                <label className="is-block">
                  <input
                    type="radio"
                    name="display"
                    value="solve"
                    checked={'solve' === display}
                    onChange={(e) => {
                      //@ts-ignore
                      setDisplay(e.target.value);
                    }}
                  />
                  {' Solves'}
                </label>
                <label className="is-block">
                  <input
                    type="radio"
                    name="display"
                    value="avg"
                    checked={'avg' === display}
                    onChange={(e) => {
                      //@ts-ignore
                      setDisplay(e.target.value);
                    }}
                  />
                  {' Averages'}
                </label>
                <label className="is-block">
                  <input
                    type="radio"
                    name="display"
                    value="mean"
                    checked={'mean' === display}
                    onChange={(e) => {
                      //@ts-ignore
                      setDisplay(e.target.value);
                    }}
                  />
                  {' Means'}
                </label>
              </div>
            </div>
            <hr />
          </form>
          <AnalyticsTable eventName={eventName} display={display} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
