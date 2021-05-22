import React from 'react'

const Events = ({eventName, changeEvent}) => {

    const setEventHelper = (e) => {
        e.preventDefault()
        changeEvent(e.target.value)
    }

    return (
        <div>
            {/*<button className="button is-ghost has-text-white" value="222" onClick={setEventHelper}>2x2x2</button>*/}
            <button className="button is-ghost has-text-white" value="333" onClick={setEventHelper}>3x3x3</button>
            <button className="button is-ghost has-text-white" value="444" onClick={setEventHelper}>4x4x4</button>
           {/*<button className="button is-ghost has-text-white" value="555" onClick={setEventHelper}>5x5x5</button>
            <button className="button is-ghost has-text-white" value="666" onClick={setEventHelper}>6x6x6</button>
            <button className="button is-ghost has-text-white" value="777" onClick={setEventHelper}>7x7x7</button>
            <button className="button is-ghost has-text-white" value="333bf" onClick={setEventHelper}>3x3x3 BF</button>
            <button className="button is-ghost has-text-white" value="444bf" onClick={setEventHelper}>4x4x4 BF</button>
            <button className="button is-ghost has-text-white" value="555bf" onClick={setEventHelper}>5x5x5 BF</button>*/}
            <button className="button is-ghost has-text-white" value="333" onClick={setEventHelper}>3x3x3 OH</button>
            <button className="button is-ghost has-text-white" value="clock" onClick={setEventHelper}>Clock</button>
            <button className="button is-ghost has-text-white" value="minx" onClick={setEventHelper}>Megaminx</button>
            {/*<button className="button is-ghost has-text-white" value="pyram" onClick={setEventHelper}>Pyraminx</button>
            <button className="button is-ghost has-text-white" value="skewb" onClick={setEventHelper}>Skewb</button>
            <button className="button is-ghost has-text-white" value="sq1" onClick={setEventHelper}>SQ-1</button>*/}
        </div>
    )
}

export default Events
