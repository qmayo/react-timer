import React from 'react';
import {useState, useEffect} from 'react';
import useKeyboardTimer from 'use-keyboard-timer';

import {getTimes, saveTime} from './utils/storageTools';
import useDidMountEffect from './utils/useDidMountEffect';
import millisecondsToSeconds from './utils/millisecondsToSeconds'

let settings = {
    timerInput: 'timer',
    inspection: 'always',
    timerUpdate: 'deciseconds',
    timeToRelease: 'stackmat',
    targetComponentID: 'timer'
  };

const Timer = ({eventName, setShouldScrambleUpdate, scrambleString}) => {
    const [previousTime, setPreviousTime] = useState({time: 0.00})

    useEffect(() => {
        const times = getTimes(eventName)
        if(times) {
            setPreviousTime(times[times.length - 1])
        } else {
            setPreviousTime({time: 0.00})
        }
    }, [eventName])

    const keyboardTimerCallback = (time, penalty) => {
        saveTime(eventName, time, penalty, scrambleString)
        setPreviousTime({time: time, penalty: penalty, scramble: scrambleString})
    }
  
    const { time, inspectionTime, state, isTiming, dnf, plusTwo } = useKeyboardTimer(settings, keyboardTimerCallback);

    useDidMountEffect(() => {
        if(state === 'NONE' || state === 'STOPPED') {
            setShouldScrambleUpdate(true)
        } else {
            setShouldScrambleUpdate(false)
        }
    }, [state])

    const renderTime = (time) => {
        return time.penalty
            ? time.penalty.type === 'DNF' //This is because the time for inspection DNFs defaults to -1, and that would look weird
                ? <p className="unselectable">DNF</p>
                : <p className="unselectable">{`${millisecondsToSeconds(time.time).toFixed(2)} (${time.penalty.type})`}</p>
            : <p className="unselectable">{millisecondsToSeconds(time.time).toFixed(2)}</p>
    }

    const renderTimer = () => { //render timer itself
        switch(state) {
            default:
                return (<p className="unselectable">{renderTime(previousTime)}</p>);

            case 'SPACE_PRESSED_INSPECTION':
                return (<p className="unselectable" style={{color: "green"}}>15</p>);
            case 'INSPECTION':
                return <p className="unselectable">{inspectionTime}</p>;

            case 'SPACE_PRESSED_TIMING':
                return (<p className="unselectable" style={{color: "red"}}>0.00</p>);
            case 'SPACE_PRESSED_VALID':
                return (<p className="unselectable" style={{color: "green"}}>0.00</p>);
            case 'STARTED':
                return <p className="unselectable">{millisecondsToSeconds(time).toFixed(2)}</p>
        }
    }

    return (
        <div className={isTiming ? 'fill-window' : ''} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{'fontSize': '10em', 'padding': '20px', margin: '5px'}}><strong>{renderTimer()}</strong></h1>
        </div>
    )
}

export default Timer
