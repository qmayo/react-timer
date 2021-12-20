import React from 'react';
import {useState, useEffect} from 'react';
import useKeyboardTimer from 'use-keyboard-timer';

let settings = {
    timerInput: 'timer',
    inspection: 'always',
    timerUpdate: 'deciseconds',
    timeToRelease: 'stackmat',
    targetComponentID: 'timer'
  };

const millisecondsToSeconds = (time) => {
    return (time / 1000).toFixed(2)
}

const Timer = ({eventName}) => {
    const [times, setTimes] = useState([])

    useEffect(() => {
        const times = JSON.parse(localStorage.getItem(eventName))
        times ? setTimes(times) : setTimes([])
    }, [eventName])

    const keyboardTimerCallback = (time, penalty) => {
        let times = JSON.parse(localStorage.getItem(eventName))

        if(times === null) {
            localStorage.setItem(eventName, JSON.stringify([{time: time, penalty: penalty}]))
            times = JSON.parse(localStorage.getItem(eventName))
            setTimes(times)
        } else {
            localStorage.setItem(eventName, JSON.stringify([...times, {time: time, penalty: penalty}]))
            times = JSON.parse(localStorage.getItem(eventName))
            setTimes(times)
        }
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
        <div className={isTiming ? 'fill-window' : ''} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{'fontSize': '10em', 'padding': '20px', margin: '5px'}}><strong>{renderTimer()}</strong></h1>
        </div>
    )
}

export default Timer
