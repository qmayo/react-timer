import Card from '../Card'
import {getMean, getBestMoX, getWorstMoX, getAvg, getBestAoX, getWorstAoX} from './sessionStatisticsTools'
import {getTimes, getCurrentTimes} from './storageTools';
import millisecondsToSeconds from './millisecondsToSeconds'

const crypto = require('crypto')

const avgsAsCards = (avgsToDisplay, eventName) => {
    return avgsToDisplay.map((avg) => {
        if(avg.type === 'avg') {
            let currentAverage, bestAverage, worstAverage;
            
            let currentTimes = getCurrentTimes(eventName, avg.size)
            currentTimes ? currentTimes = currentTimes.map((solve) => millisecondsToSeconds(solve.time)) : currentTimes = null

            let times = getTimes(eventName)
            times ? times = times.map((solve) => millisecondsToSeconds(solve.time)) : times = null

            if(currentTimes) {
                currentAverage = getAvg(currentTimes).toFixed(2)
            } 
            
            if(times) {
                bestAverage = getBestAoX(times, avg.size)
                if(bestAverage) {
                    bestAverage = bestAverage.toFixed(2)
                }

                worstAverage = getWorstAoX(times, avg.size)
                if(worstAverage) {
                    worstAverage = worstAverage.toFixed(2)
                }
            }

            return (
                <Card key={crypto.randomBytes(20).toString('hex')}>
                    <h4 className="title is-4">{`Ao${avg.size}`}:</h4>
                    <p>Current: {currentAverage}</p>
                    <p>Best: {bestAverage}</p>
                    <p>Worst: {worstAverage}</p>
                </Card>
            )
        } else { //avg.type === 'mean'
            let currentMean, bestMean, worstMean;
            
            let currentTimes = getCurrentTimes(eventName, avg.size)
            currentTimes ? currentTimes = currentTimes.map((solve) => solve.time) : currentTimes = null

            let times = getTimes(eventName)
            times ? times = times.map((solve) => solve.time) : times = null

            if(currentTimes) {
                currentMean = getMean(currentTimes).toFixed(2)
            } 
            
            if(times) {
                bestMean = getBestMoX(times, avg.size)
                if(bestMean) {
                    bestMean = bestMean.toFixed(2)
                }

                worstMean = getWorstMoX(times, avg.size)
                if(worstMean) {
                    worstMean = worstMean.toFixed(2)
                }
            }

            return (
                <Card key={crypto.randomBytes(20).toString('hex')}>
                    <h4 className="title is-4">{`Mo${avg.size}`}:</h4>
                    <p>Current: {currentMean}</p>
                    <p>Best: {bestMean}</p>
                    <p>Worst: {worstMean}</p>
                </Card>
            )
        }
    })
}

export default avgsAsCards