import React, { useState } from 'react';
import { AverageType, PuzzleSolve, WCAEvent } from '../../types';
import AverageModal from '../modals/AverageModal';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';
import { getAvg, getMean } from '../utils/sessionStatisticsTools';

interface CompetetiveAverageModalProps {
  eventName: WCAEvent;
  solves: Array<PuzzleSolve>;
  averageType: AverageType;
}

const CompetetiveAverageModalWrapper = ({
  eventName,
  solves,
  averageType,
}: CompetetiveAverageModalProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div>
      {' '}
      <h4 className="title is-4">
        {averageType === 'avg' ? 'Average' : 'Mean'}:{' '}
        <a onClick={() => setIsActive(true)}>
          {averageType === 'avg' //@ts-ignore
            ? millisecondsToHHMMSSDD(getAvg(solves)) //@ts-ignore
            : millisecondsToHHMMSSDD(getMean(solves))}
        </a>{' '}
      </h4>
      <AverageModal
        eventName={eventName}
        solves={solves}
        averageType={averageType}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default CompetetiveAverageModalWrapper;
