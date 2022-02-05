import React from 'react';
import { WCAEvent } from '../types';
import { getCurrentTimes } from './utils/storageTools';
import SolveModalWrapper from './SolveModalWrapper';

export interface AnalyticsProps {
  eventName: WCAEvent;
}

const Analytics = ({ eventName }: AnalyticsProps) => {
  return (
    <div className="columns is-vcentered">
      <div className="column is-8 has-text-centered">
        {/* @ts-ignore */}
        <SolveModalWrapper eventName={eventName} />
      </div>
    </div>
  );
};

export default Analytics;
