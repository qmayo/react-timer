import React from 'react'
import {useState, useEffect} from 'react'
import Timer from './Timer'
import Card from './Card'
import Scramble from './scrambles/Scramble'

import {getMean, getBestMoX, getAvg, getBestAoX} from './utils/sessionStatisticsTools'
import {getTimes, getCurrentTimes} from './utils/storageTools';


const Casual = ({eventName}) => {
    const [averageType, setAverageType] = useState('Ao5')
    const [scrambleString, setScramble] = useState('')
    const [shouldScrambleUpdate, setShouldScrambleUpdate] = useState(false)

    useEffect(() => {
        if(['666wca', '777wca', '333ni', '444bld', '555bld'].includes(eventName)) {
            setAverageType('Mo3')
        } else {
            setAverageType('Ao5')
        }
    }, [eventName])    

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
                        <Card>
                            <h4 className="title is-4">{averageType}:</h4>
                            <p>Current: {}</p>
                            <p>Best: 0</p>
                            <p>Worst: 0</p>
                        </Card>
                        <Card>
                            <h4 className="title is-4">Ao12:</h4>
                            <p>Current: 0</p>
                            <p>Best: 0</p>
                            <p>Worst: 0</p>
                        </Card>
                        <Card>
                            <h4 className="title is-4">Ao100:</h4>
                            <p>Current: 0</p>
                            <p>Best: 0</p>
                            <p>Worst: 0</p>
                        </Card>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Casual
