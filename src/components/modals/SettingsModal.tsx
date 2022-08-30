import React, { useContext } from 'react';
import { BiX } from 'react-icons/bi';
import { AverageType, InspectionMode, TimeEntryType } from '../../types';
import Dropdown from '../sections/Dropdown';
import SettingsContext from '../contexts/SettingsContext';
import getTimeEntryTypeString from '../utils/getTimeEntryTypeString';

interface SettingsModalProps {
  isActive: boolean;
  setIsActive: any;
}

const SettingsModal = ({ isActive, setIsActive }: SettingsModalProps) => {
  const {
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
  } = useContext(SettingsContext);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setIsActive(false)}></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-flex-direction-column is-flex-wrap-nowrap has-text-centered has-background-white">
            <a style={{ marginLeft: 'auto' }}>
              <BiX color="black" size={40} onClick={() => setIsActive(false)} />
            </a>
            <h2 className="title is-2">Settings</h2>
            <div className="has-text-left ml-6">
              <div className="mb-6">
                <h6 className="title is-6">Timer Options</h6>
                <div className="is-flex is-align-items-center m-3">
                  <span className="mr-2">Timer Type:</span>
                  <Dropdown
                    title={getTimeEntryTypeString(timeEntryType)}
                    options={[
                      {
                        name: 'Keyboard',
                        value: 'timer',
                      },
                      {
                        name: 'Manual Entry',
                        value: 'manual',
                      },
                      {
                        name: 'Stackmat',
                        value: 'stackmat',
                      },
                    ]}
                    selectedOption={timeEntryType}
                    setSelectedOption={setTimeEntryType}
                  />
                </div>
                <div className="is-flex is-align-items-center m-3">
                  <span className="mr-2">Inspection:</span>
                  <span className="control ml-1">
                    <label className="radio">
                      <input
                        type="radio"
                        name="inspection"
                        checked={inspectionMode === 'nonbld' ? true : false}
                        onClick={() => {
                          setInspectionMode('nonbld'); //TODO: implement nonbld functionality in timer
                        }}
                      />
                      Always except BLD
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="inspection"
                        checked={inspectionMode === 'always' ? true : false}
                        onClick={() => {
                          setInspectionMode('always');
                        }}
                      />
                      Always
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="inspection"
                        checked={inspectionMode === 'never' ? true : false}
                        onClick={() => {
                          setInspectionMode('never');
                        }}
                      />
                      Never
                    </label>
                  </span>
                </div>
                {timeEntryType === 'manual' && (
                  <div className="is-flex is-align-items-center m-3">
                    <span className="mr-2">Virtual Inspection (if using manual entry):</span>
                    <span className="control m-1">
                      <label className="radio">
                        <input
                          type="radio"
                          name="vinspection"
                          checked={useVirtualInspection ? true : false}
                          onClick={() => {
                            setUseVirtualInspection(true);
                          }}
                        />
                        On
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="vinspection"
                          checked={!useVirtualInspection ? true : false}
                          onClick={() => {
                            setUseVirtualInspection(false);
                          }}
                        />
                        Off
                      </label>
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <h6 className="title is-6">Statistics Options</h6>
                <div className="is-flex is-align-items-center m-3">
                  <span className="mr-2">Statistics Type:</span>
                  <span className="control m-1">
                    <label className="radio">
                      <input
                        type="radio"
                        name="statstype"
                        checked={averageDisplayType === 'avg' ? true : false}
                        onClick={() => {
                          setAverageDisplayType('avg');
                        }}
                      />
                      Average
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="statstype"
                        checked={averageDisplayType === 'mean' ? true : false}
                        onClick={() => {
                          setAverageDisplayType('mean');
                        }}
                      />
                      Mean
                    </label>
                  </span>
                </div>
                <div className="is-flex is-align-items-center m-3">
                  <span className="mr-2">Statistics #1 Size:</span>
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        {averageDisplayType === 'avg' ? 'Ao' : 'Mo'}
                      </a>
                    </p>
                    <p className="control">
                      <input
                        className="input"
                        style={{ width: 65 }}
                        type="text"
                        value={averageSizes[0] === 0 ? '' : averageSizes[0]}
                        onChange={(e) => {
                          //@ts-ignore
                          const value = parseInt(e.target.value);
                          !isNaN(value)
                            ? setAverageSizes([value, averageSizes[1], averageSizes[2]])
                            : setAverageSizes([0, averageSizes[1], averageSizes[2]]);
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="is-flex is-align-items-center m-3">
                  <span className="mr-2">Statistics #2 Size:</span>
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        {averageDisplayType === 'avg' ? 'Ao' : 'Mo'}
                      </a>
                    </p>
                    <p className="control">
                      <input
                        className="input"
                        style={{ width: 65 }}
                        type="text"
                        value={averageSizes[1] === 0 ? '' : averageSizes[1]}
                        onChange={(e) => {
                          //@ts-ignore
                          const value = parseInt(e.target.value);
                          !isNaN(value)
                            ? setAverageSizes([averageSizes[0], value, averageSizes[2]])
                            : setAverageSizes([averageSizes[0], 0, averageSizes[2]]);
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="is-flex is-align-items-center m-3">
                  <span className="mr-2">Statistics #3 Size:</span>
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        {averageDisplayType === 'avg' ? 'Ao' : 'Mo'}
                      </a>
                    </p>
                    <p className="control">
                      <input
                        className="input"
                        style={{ width: 65 }}
                        type="text"
                        value={averageSizes[2] === 0 ? '' : averageSizes[2]}
                        onChange={(e) => {
                          //@ts-ignore
                          const value = parseInt(e.target.value);
                          !isNaN(value)
                            ? setAverageSizes([averageSizes[0], averageSizes[1], value])
                            : setAverageSizes([averageSizes[0], averageSizes[1], 0]);
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
