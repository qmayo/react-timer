import React, { useState } from 'react';
import { InspectionMode, TimeEntryType } from '../../types';
import SettingsModal from '../modals/SettingsModal';

interface SettingsModalWrapperProps {
    timeEntryType: TimeEntryType;
    setTimeEntryType: any;
    inspectionMode: InspectionMode;
    setInspectionMode: any;
    useVirtualInspection: boolean;
    setUseVirtualInspection: any;
}

const SettingsModalWrapper = ({ timeEntryType, setTimeEntryType, inspectionMode, setInspectionMode, useVirtualInspection, setUseVirtualInspection }: SettingsModalWrapperProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
    <a className='navbar-link is-arrowless has-text-white has-background-link-dark' onClick={() => setIsActive(!isActive)}>
        Settings
        <SettingsModal
          isActive={isActive}
          setIsActive={setIsActive}
          timeEntryType={timeEntryType} 
          setTimeEntryType={setTimeEntryType}
          inspectionMode={inspectionMode}
          setInspectionMode={setInspectionMode} 
          useVirtualInspection={useVirtualInspection}
          setUseVirtualInspection={setUseVirtualInspection}
        />
    </a>
  )
}

export default SettingsModalWrapper