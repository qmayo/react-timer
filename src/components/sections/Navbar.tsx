import React, { useEffect, useState } from 'react';
import { AverageType, InspectionMode, TimeEntryType, WCAEvent } from '../../types';
import Events from './Events';
import { Link, useLocation } from 'react-router-dom';
import SettingsModalWrapper from './SettingsModalWrapper';

interface NavbarProps {
  eventName: WCAEvent;
  changeEvent: any;
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

const Navbar = ({
  eventName,
  changeEvent,
  timeEntryType,
  setTimeEntryType,
  inspectionMode,
  setInspectionMode,
  useVirtualInspection,
  setUseVirtualInspection,
  averageDisplayType,
  setAverageDisplayType,
  averageSizes,
  setAverageSizes,
}: NavbarProps) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setMenuActive(false);
  }, [location]);

  return (
    <div className="navbar has-background-link-dark mb-6">
      <div className="navbar-brand">
        <h1 className="navbar-item title is-1 has-text-white mb-0">ReactTimer</h1>
        <a
          role="button"
          className={`navbar-burger ${menuActive ? 'is-active' : ''}`}
          style={{ alignSelf: 'center' }}
          onClick={() => {
            setMenuActive(!menuActive);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu has-background-link-dark ${menuActive ? 'is-active' : ''}`}>
        <div className="navbar-start"></div>
        <div className="navbar-end mr-6">
          <div className="navbar-item pl-0">
            <SettingsModalWrapper />
          </div>
          <div className="navbar-item pl-0">
            <Link to="/analytics">
              <a className="navbar-link is-arrowless has-text-white has-background-link-dark">
                Analytics
              </a>
            </Link>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-text-white has-background-link-dark">Mode</a>
            <div className="navbar-dropdown has-background-link-dark">
              <Link to="/casual">
                <a className="navbar-item has-text-white has-background-link-dark">Casual</a>
              </Link>
              <Link to="/competetive">
                <a className="navbar-item has-text-white has-background-link-dark">Competetive</a>
              </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-text-white has-background-link-dark">Event</a>
            <div className="navbar-dropdown has-background-link-dark">
              <Events eventName={eventName} changeEvent={changeEvent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
