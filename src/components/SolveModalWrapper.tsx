import React, { useState } from 'react';
import { WCAEvent } from '../types';
import SolveModal from './SolveModal';
import { getCurrentTimes } from './utils/storageTools';

export interface SolveModalWrapperProps {
  eventName: WCAEvent;
}

const SolveModalWrapper = ({ eventName }: SolveModalWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <SolveModal
      eventName={eventName} /* @ts-ignore */
      solve={getCurrentTimes(eventName, 1)[0]}
      isActive={isActive}
      setIsActive={setIsActive}
    />
  );
};

export default SolveModalWrapper;
