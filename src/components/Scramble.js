import React from 'react'
import { randomScrambleStringForEvent } from "scrambles"

const Scramble = ({eventName}) => {
    let scramble = null
    randomScrambleStringForEvent(eventName).then((scrambleString) => scramble = scrambleString)
    return (
        <div>
            <h3 className="title is-3">{scramble}</h3>
        </div>
    )
}

export default Scramble
