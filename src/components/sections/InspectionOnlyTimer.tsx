import React from 'react'
import { useInspectionOnlyTimer } from 'use-keyboard-timer';

let settings = {
    timeToRelease: 'stackmat',
    targetComponentId: 'timer',
}

const InspectionOnlyTimer = () => {
  const {
    inspectionTime,
    isInspecting,
    state
  } = useInspectionOnlyTimer({timeToRelease: 'stackmat', targetComponentID: 'timer'});

  const renderTimer = () => {
    switch (state) {
      case 'SPACE_PRESSED_INSPECTION':
        return (
          <span className="unselectable" style={{ color: 'green' }}>
            15
          </span>
        );
      case 'INSPECTION':
        return <span className="unselectable">{inspectionTime}</span>;
      default:
        return (
          <span className="unselectable">15</span>
        )
    }
  };

  return (
    <div
      className={
        'is-flex is-justify-content-center is-align-items-center'}
    >
      <h1 style={{ fontSize: '12vh', padding: '20px', margin: '5px' }}>
        <strong>{renderTimer()}</strong>
      </h1>
    </div>
  )
}

export default InspectionOnlyTimer