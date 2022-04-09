import React, { useContext, useEffect, useState } from 'react';
import { AverageType, PuzzleSolve, WCAEvent } from '../../types';
import { BiX } from 'react-icons/bi';
import SolvesContext from '../contexts/SolvesContext';
import eventNameToFullName from '../utils/eventNameToFullName';
import millisecondsToHHMMSSDD from '../utils/millisecondsToHHMMSSDD';

interface AverageModalProps {
  eventName: WCAEvent;
  solves: Array<PuzzleSolve>;
  averageType: AverageType;
  average: number; //Actual average in milliseconds
  isActive: boolean;
  setIsActive: any;
}

const AverageModal = ({
  eventName,
  solves,
  averageType,
  average,
  isActive,
  setIsActive,
}: AverageModalProps) => {
  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setIsActive(false)}></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-flex-direction-column is-flex-wrap-nowrap is-justify-content-center has-background-white">
            <a style={{ marginLeft: 'auto' }}>
              <BiX color="black" size={40} onClick={() => setIsActive(false)} />
            </a>
            <h2 className="title is-2">{eventNameToFullName(eventName)}</h2>
            <h4 className="title is-4">
              {averageType === 'avg' ? 'Average' : 'Mean'}: {millisecondsToHHMMSSDD(average)}
            </h4>
            <ul className="has-text-left">
              {solves &&
                solves.map((solve) => {
                  return (
                    <li className="mb-5">
                      <p className="is-size-4">
                        Time:{' '}
                        {millisecondsToHHMMSSDD(solve.time) +
                          (solve.penalty && solve.time !== -1 ? ` (${solve.penalty.type})` : '')}
                      </p>
                      <p>Scramble: {solve.scramble}</p>
                      <p>
                        Timestamp:{' '}
                        {new Date(solve.date).toLocaleDateString() +
                          ' ' +
                          new Date(solve.date).toLocaleTimeString()}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageModal;