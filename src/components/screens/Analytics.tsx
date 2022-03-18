import React, { useState } from 'react';
import eventNameToFullName from '../utils/eventNameToFullName';
import AnalyticsTable from '../sections/AnalyticsTable';
import { AverageType, WCAEvent } from '../../types';

interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  const [display, setDisplay] = useState<'solve' | AverageType>('solve');
  const [averageSize, setAverageSize] = useState<number>(5);
  
  return (
    <div>
      <div className="container has-text-centered">
        <h1 className="title is-2">{eventNameToFullName(eventName)}</h1>
        <div>
          <form className="mb-3 ml-2" onSubmit={(e) => e.preventDefault}>
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
            {display !== 'solve' && (
              <>
              <hr />
              <div className='field has-addons'>
                <p className="control">
                  <a className="button is-static">{display === 'avg' ? 'Ao' : 'Mo'}</a>
                </p>
                <p className="control">
                  <input
                    className="input"
                    style={{ width: 65 }}
                    type="text"
                    value={averageSize === 0 ? '' : averageSize}
                    onChange={(e) => {
                      //@ts-ignore
                      const value = parseInt(e.target.value);
                      !isNaN(value) ? setAverageSize(value) : setAverageSize(0);
                    }}
                  />
                </p>
              </div>
              <hr />
              </>
            )}
          </form>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content space-around"></div>
          <AnalyticsTable eventName={eventName} display={display} averageSize={averageSize} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
