import React, { useState } from 'react';
import { AverageType, InspectionMode, TimeEntryType } from '../../types';
import SettingsModal from '../modals/SettingsModal';

interface SettingsModalWrapperProps {
  timeEntryType: TimeEntryType;
  setTimeEntryType: any;
  inspectionMode: InspectionMode;
  setInspectionMode: any;
  useVirtualInspection: boolean;
  setUseVirtualInspection: any;
  averageDisplayType: AverageType;
  setAverageDisplayType: any;
  averageSizes: Array<number>;
  setAverageSizes: any;
}

const SettingsModalWrapper = ({
  timeEntryType,
  setTimeEntryType,
  inspectionMode,
  setInspectionMode,
  useVirtualInspection,
  setUseVirtualInspection,
  averageDisplayType,
  setAverageDisplayType,
  averageSizes,
  setAverageSizes
}: SettingsModalWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <React.Fragment>
    <a
      className="navbar-link is-arrowless has-text-white has-background-link-dark"
      onClick={() => setIsActive(!isActive)}
    >
      Settings
    </a>
    <SettingsModal
    isActive={isActive}
    setIsActive={setIsActive}
    timeEntryType={timeEntryType}
    setTimeEntryType={setTimeEntryType}
    inspectionMode={inspectionMode}
    setInspectionMode={setInspectionMode}
    useVirtualInspection={useVirtualInspection}
    setUseVirtualInspection={setUseVirtualInspection}
    averageDisplayType={averageDisplayType}
    setAverageDisplayType={setAverageDisplayType}
    averageSizes={averageSizes}
    setAverageSizes={setAverageSizes}
  />
  </React.Fragment>
  );
};

export default SettingsModalWrapper;
