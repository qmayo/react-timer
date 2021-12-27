/* 
ALL FUNCTIONS IN THIS FILE MUST TAKE IN NUMBERS AND NOT TIME OBJECTS
*/

export const getMean = (times) => { //Returns mean of all times provided
    return times ? times.reduce((a, b) => a + b) / times.length : null
}

export const getBestMoX = (times, meanSize) => { //Returns best mean of size meanSize in a set of times.
    if(times === null || times.length < meanSize) {
        return null
    } else if(times.length === meanSize) {
        return getMean(times)
    } else {
        let bestMean = Infinity
        
        for(let i = 0; i < times.length - meanSize + 1; i++) {
            const mean = getMean(times.slice(i, i + meanSize))
            if(mean < bestMean) {
                bestMean = mean
            }
        }
        return bestMean === Infinity ? null : bestMean
    }
}

export const getWorstMoX = (times, meanSize) => { //Returns worst mean of size meanSize in a set of times.
    if(times === null || times.length < meanSize) {
        return null
    } else if(times.length === meanSize) {
        return getMean(times)
    } else {
        let worstMean = 0

        for(let i = 0; i < times.length - meanSize + 1; i++) {
            const mean = getMean(times.slice(i, i + meanSize))
            if(mean > worstMean) {
                worstMean = mean
            }
        }
        return worstMean === 0 ? null : worstMean
    }
}

export const getAvg = (times) => { //Averages all times provided using speed-cubing standards. Can be used for calculating current averages.
    if(times) {
        if(times.length === 1) {
            return times[0]
        } else if(times.length === 2) {
            return times.reduce((a, b) => a + b) / times.length
        } else {
            const excludedtimes = Math.ceil(times.length * 0.05)
            let clonedTimes = [...times] //Call-by-sharing shenanigans
    
            for(let i = 0; i < excludedtimes; i++) {
                const min = Math.min(...clonedTimes)
                const max = Math.max(...clonedTimes)
                clonedTimes.splice(times.findIndex((time) => time === min), 1)
                clonedTimes.splice(times.findIndex((time) => time === max), 1)
            }
            
            return clonedTimes.reduce((a, b) => a + b) / times.length
        }
    } else {
        return null
    }
}

export const getBestAoX = (times, avgSize) => { //Returns best average of size avgSize in a set of times.
    if(times === null || times.length < avgSize) {
        return null
    } else if(times.length === avgSize) {
        return getAvg(times)
    } else {
        let bestAvg = Infinity

        for(let i = 0; i < times.length - avgSize + 1; i++) {
            const avg = getAvg(times.slice(i, i + avgSize))
            if(avg < bestAvg) {
                bestAvg = avg
            }
        }

        return bestAvg === Infinity ? null : bestAvg
    }
}

export const getWorstAoX = (times, avgSize) => { //Returns worst average of size avgSize in a set of times.
    if(times === null || times.length < avgSize) {
        return null
    } else if(times.length === avgSize) {
        return getAvg(times)
    } else {
        let worstAvg = 0

        for(let i = 0; i < times.length - avgSize + 1; i++) {
            const avg = getAvg(times.slice(i, i + avgSize))
            if(avg > worstAvg) {
                worstAvg = avg
            }
        }

        return worstAvg === 0 ? null : worstAvg
    }
}