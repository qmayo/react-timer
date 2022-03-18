import React, { useState } from 'react';
import { AverageType, PuzzleSolve, WCAEvent } from '../../types';
import AverageModal from '../modals/AverageModal';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

interface AnalyticsAverageModalWrapperProps {
  eventName: WCAEvent;
  averageType: AverageType;
  average: { solves: Array<PuzzleSolve>; average: number };
}

const AnalyticsAverageModalWrapper = ({
  eventName,
  averageType,
  average,
}: AnalyticsAverageModalWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <React.Fragment key={average.solves[0].solveId}>
      <tr
        onClick={() => {
          setIsActive(true);
        }}
      >
        <td className="is-size-5" style={{ width: '35%' }}>
          {millisecondsToHHMMSSDD(average.average)}
        </td>
        <td className="is-size-5" style={{ width: '65%' }}>
          {average.solves.map((solve, index) => {
            return (
              <>
                {millisecondsToHHMMSSDD(solve.time) +
                  (solve.penalty && solve.time !== -1 ? ` (${solve.penalty.type})` : '') +
                  (index === average.solves.length - 1 ? '' : ', ')}
              </>
            );
          })}
        </td>
      </tr>
      <AverageModal
        eventName={eventName}
        solves={average.solves}
        averageType={averageType}
        average={average.average}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </React.Fragment>
  );
};

export default AnalyticsAverageModalWrapper;
