import React from 'react';
import { BiX } from 'react-icons/bi';
import { InspectionMode, TimeEntryType } from '../../types';
import Dropdown from '../sections/Dropdown';

interface SettingsModalProps {
    isActive: boolean;
    setIsActive: any;
    timeEntryType: TimeEntryType;
    setTimeEntryType: any;
    inspectionMode: InspectionMode;
    setInspectionMode: any;
    useVirtualInspection: boolean;
    setUseVirtualInspection: any;
}

const SettingsModal = ({ isActive, setIsActive, timeEntryType, setTimeEntryType, inspectionMode, setInspectionMode, useVirtualInspection, setUseVirtualInspection }: SettingsModalProps) => {
    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={() => setIsActive(false)}></div>
            <div className='modal-content'>
                <div className='box'>
                    <div className='is-flex is-flex-direction column is-flex-wrap-nowrap has-text-centered has-background-white'>
                        <a style={{ marginLeft: 'auto' }}>
                            <BiX color="black" size={40} onClick={() => setIsActive(false)} />
                        </a>
                        <h2 className='title is-2'>Settings</h2>
                        <div className='has-text-left ml-6'>
                            <div>
                                Timer type: 
                                <Dropdown 
                                  title='Timer' 
                                  options={[
                                    {
                                        name: 'Keyboard',
                                        value: 'timer',
                                    },
                                    {
                                        name:'Manual Entry',
                                        value: 'manual',
                                    },
                                    {
                                        name: 'Stackmat',
                                        value: 'stackmat',
                                    }
                                  ]}
                                  selectedOption={timeEntryType}
                                  setSelectedOption={setTimeEntryType}
                                />
                            </div>
                            <div>
                                Inspection: 
                                <span className="control ml-1">
                                    <label className="radio">
                                    <input
                                        type="radio"
                                        name="inspection"
                                        checked={ inspectionMode === 'nonbld' ? true : false }
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
                                        checked={ inspectionMode === 'always' ? true : false }
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
                                        checked={ inspectionMode === 'never' ? true : false }
                                        onClick={() => {
                                            setInspectionMode('never');
                                        }}
                                    />
                                    Never
                                    </label>
                                </span>
                            </div>
                            {timeEntryType === 'manual' && (
                                <div>
                                    Virtual Inspection (if using manual entry): 
                                    <span className='control m-1'>
                                        <label className='radio'>
                                        <input
                                        type='radio'
                                        name='vinspection'
                                        checked={ useVirtualInspection ? true : false }
                                        onClick={() => {
                                            setUseVirtualInspection(true);
                                        }}
                                        />
                                        On
                                        </label>
                                        <label className='radio'>
                                        <input
                                        type='radio'
                                        name='vinspection'
                                        checked={ !useVirtualInspection ? true : false }
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
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SettingsModal;