import React, { createContext } from 'react';
import { AverageType, InspectionMode, TimeEntryType } from '../../types';

interface SettingsContextInterface {
  timeEntryType: TimeEntryType;
  setTimeEntryType: (timeEntryType: TimeEntryType) => any;
  inspectionMode: InspectionMode;
  setInspectionMode: (inspectionMode: InspectionMode) => any;
  useVirtualInspection: boolean;
  setUseVirtualInspection: (useVirtualInspection: boolean) => any;
  averageDisplayType: AverageType;
  setAverageDisplayType: (averageDispalyType: AverageType) => any;
  averageSizes: Array<number>;
  setAverageSizes: (averageSizes: Array<number>) => any;
}

const SettingsContext = createContext<SettingsContextInterface>(
  undefined as unknown as SettingsContextInterface
);

export default SettingsContext;
