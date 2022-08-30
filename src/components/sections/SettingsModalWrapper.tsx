import React, { useState } from 'react';
import { AverageType, InspectionMode, TimeEntryType } from '../../types';
import SettingsModal from '../modals/SettingsModal';

const SettingsModalWrapper = () => {
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
  />
  </React.Fragment>
  );
};

export default SettingsModalWrapper;
