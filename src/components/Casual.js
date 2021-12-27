import React from 'react'
import {useState, useEffect} from 'react'
import Timer from './Timer'
import Card from './Card'
import Scramble from './scrambles/Scramble'

import avgsAsCards from './utils/avgsAsCards'

const Casual = ({eventName, avgsToDisplay}) => {
    const [scrambleString, setScramble] = useState('')
    const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState(false)

    return (
        <div>
            <div className="container has-text-centered">
                <Scramble eventName={eventName} scrambleString={scrambleString} setScramble={setScramble} shouldScrambleUpdate={shouldScrambleUpdate} setShouldScrambleUpdate={setShouldScrambleUpdate}/>
            </div>
            <div className="columns is-vcentered">
                <div className="column has-text-centered">
                    <div id="timer"> {/* id must match targetComponentID in Timer.js */}
                        <Timer eventName={eventName} setShouldScrambleUpdate={setShouldScrambleUpdate} scrambleString={scrambleString}/>
                    </div>
                    <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-around">
                        {avgsAsCards(avgsToDisplay, eventName)}
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Casual