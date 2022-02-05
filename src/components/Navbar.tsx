import React from 'react';
import { WCAEvent } from '../types';
import Events from './Events';
import { BiCubeAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export interface NavbarProps {
  eventName: WCAEvent;
  changeEvent: any;
}

const Navbar = ({ eventName, changeEvent }: NavbarProps) => {
  return (
    <div className="navbar has-background-link-dark mb-6">
      <div className="navbar-brand">
        <div
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <h1 className="navbar-item title is-1 has-text-white">ReactTimer</h1>
          <BiCubeAlt style={{ marginTop: 23 }} color="white" size={50} />
        </div>
      </div>
      <div className="navbar-start"></div>
      <div className="navbar-end mr-6">
        <div className="navbar-item">
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
              <a href="competetive" className="navbar-item has-text-white has-background-link-dark">
                Competetive
              </a>
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
  );
};

export default Navbar;
