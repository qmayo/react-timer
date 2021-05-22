import React from 'react';
import {useState, useEffect, useRef} from 'react';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isActive, toggleActive] = useState(false);
    const interval = useRef(null);

    const startTimer = () => {
        setTime(0)
        interval.current = setInterval(() => {
            setTime((time) => time + 0.01)
        }, 10)
    }

    const stopTimer = () => {
        clearInterval(interval.current)
        //Upload time
    }

    const handleToggle = () => {
        toggleActive(isActive ? false : true)
    }

    useEffect(() => {isActive ? startTimer() : stopTimer()}, [isActive])

    return (
        <div>
            <p style={{'fontSize': '12vw'}}><strong>{time.toFixed(2)}</strong></p>
            <button className="button is-primary" onClick={handleToggle}>Toggle</button>
        </div>
    )
}

export default Timer
