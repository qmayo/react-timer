import React, { useState } from 'react';
import eventNameToFullName from '../utils/eventNameToFullName';
import AnalyticsTable from '../sections/AnalyticsTable';
import { AverageType, WCAEvent } from '../../types';
import Dropdown from '../sections/Dropdown';

interface AnalyticsProps {
  eventName: WCAEvent;
}

const dropdownOptions: Array<{
  name: string;
  value: string;
}> = [
  {
    name: 'Solves',
    value: 'solve',
  },
  {
    name: 'Averages',
    value: 'avg',
  },
  {
    name: 'Means',
    value: 'mean',
  },
];

const Analytics = ({ eventName }: AnalyticsProps) => {
  const [display, setDisplay] = useState<'solve' | AverageType>('solve');
  const [averageSize, setAverageSize] = useState<number>(5);

  return (
    <div>
      <div className="container has-text-centered">
        <h1 className="title is-2">{eventNameToFullName(eventName)}</h1>
        <div>
          <div className="mb-3 ml-2 has-text-left">
            <Dropdown
              title="Set Display"
              options={dropdownOptions}
              selectedOption={display}
              setSelectedOption={setDisplay}
            />
            {display !== 'solve' && (
              <>
                <hr />
                <div className="field has-addons">
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
          </div>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content space-around"></div>
          <AnalyticsTable eventName={eventName} display={display} averageSize={averageSize} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
