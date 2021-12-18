import React from 'react';
import {useState} from 'react';
import useKeyboardTimer from 'use-keyboard-timer';



const millisecondsToSeconds = (time) => {
    return (time / 1000).toFixed(2)
}

const Timer = () => {
    const [times, setTimes] = useState([]); //Refactor to pull from localstorage; string because of DNFs

    const settings = {
        timerInput: 'timer',
        inspection: 'always',
        timerUpdate: 'deciseconds',
        timeToRelease: 'stackmat',
      };

    const keyboardTimerCallback = (time, penalty) => {
        setTimes([...times, {time: time, penalty: penalty}])
    }
  
    const { time, inspectionTime, state, isTiming, dnf, plusTwo } = useKeyboardTimer(settings, keyboardTimerCallback);

    const renderTime = (time) => {
        return time.penalty 
            ? time.penalty.type === 'DNF' //This is because the time for inspection DNFs defaults to -1, and that would look weird
                ? <p className="unselectable">DNF</p>
                : <p className="unselectable">{`${millisecondsToSeconds(time.time)} (${time.penalty.type})`}</p>
            : <p className="unselectable">{millisecondsToSeconds(time.time)}</p>
    }

    const renderTimer = () => { //render timer itself
        switch(state) {
            default:
                return (<p className="unselectable">{times.length === 0 ? "0.00" : renderTime(times[times.length - 1])}</p>);

            case 'SPACE_PRESSED_INSPECTION':
                return (<p className="unselectable" style={{color: "green"}}>15</p>);
            case 'INSPECTION':
                return <p className="unselectable">{inspectionTime}</p>;

            case 'SPACE_PRESSED_TIMING':
                return (<p className="unselectable" style={{color: "red"}}>0.00</p>);
            case 'SPACE_PRESSED_VALID':
                return (<p className="unselectable" style={{color: "green"}}>0.00</p>);
            case 'STARTED':
                return <p className="unselectable">{millisecondsToSeconds(time)}</p>
        }
    }

    return (
        <div>
            <h1 style={{'fontSize': '10em', 'padding': '20px'}}><strong>{renderTimer()}</strong></h1>
        </div>
    )
}

export default Timer
