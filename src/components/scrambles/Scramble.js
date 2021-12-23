import React from 'react'
import {useState, useEffect} from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import cstimerScrambler from './worker'

const cleanMegaScramble = (scrambleString) => { //CStimer mega scrambles include \n and ~ symbols; needs cleaning
    scrambleString = scrambleString.replace(/~/g, '')
    scrambleString = scrambleString.replace(/\\n/g, '')
    return scrambleString
}

const Scramble = ({eventName, scrambleString, setScramble, shouldScrambleUpdate, setShouldScrambleUpdate}) => {
    const getNewScramble = () => {
        setScramble('') //Allow loading sign to display

        let scrambleArgs = [eventName] //CStimer demands scramble lengths for some events
        switch(eventName) {
            case '555wca':
                scrambleArgs = [eventName, 60]
                break;
            case '555bld':
                scrambleArgs = [eventName, 60]
                break;
            case '666wca':
                scrambleArgs = [eventName, 80]
                break;
            case '777wca':
                scrambleArgs = [eventName, 100]
                break;
            case 'mgmp':
                scrambleArgs = [eventName, 60]
                break;
            case '333oh':
                scrambleArgs = ['333']
                break;
            default:
                break;
        }

        cstimerScrambler.getScramble(scrambleArgs, function(scramble) {
            eventName === 'mgmp' ? setScramble(cleanMegaScramble(scramble)) : setScramble(scramble)
        })   
    }

    useEffect(() => { 
        getNewScramble()
    }, [eventName])

    useEffect(() => {
        if(shouldScrambleUpdate) {
            getNewScramble()
        }
    }, [shouldScrambleUpdate])
    
    return (
        <div>
            <h4 className="title is-4">{scrambleString ? scrambleString : <AiOutlineLoading3Quarters className="spin"/>}</h4>
        </div>
    )
}

export default Scramble
