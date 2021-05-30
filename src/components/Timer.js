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

    useEffect(() => {isActive ? startTimer() : stopTimer()}, [isActive])

    return (
        <div>
            <h1 style={{'fontSize': '10em', 'padding': '20px'}}><strong>{time.toFixed(2)}</strong></h1>
        </div>
    )
}

export default Timer
