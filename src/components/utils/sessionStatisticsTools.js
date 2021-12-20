export const getMean = (solves) => { //Returns mean of all solves provided
    return solves.reduce((a, b) => a + b) / solves.length
}

export const getBestMoX = (solves, meanSize) => { //Returns best mean of size meanSize in a set of solves.
    if(solves.length < meanSize) {
        return null
    } else if(solves.length === meanSize) {
        return getMean(solves)
    } else {
        let bestMean = 0
        for(let i = 0; i < solves.length - meanSize + 1; i++) {
            const mean = getMean(solves.slice(i, i + meanSize))
            if(mean > bestMean) {
                bestMean = mean
            }
        }
        return bestMean
    }
}

export const getAvg = (solves) => { //Averages all solves provided using speed-cubing standards. Can be used for calculating current averages.
    const excludedSolves = Math.ceil(solves.length * 0.05)
    
    for(let i = 0; i < excludedSolves; i++) {
        const min = Math.min(...solves)
        const max = Math.max(...solves)
        solves.splice(solves.findIndex((time) => time === min), 1)
        solves.splice(solves.findIndex((time) => time === max), 1)
    }

    return solves.reduce((a, b) => a + b) / solves.length
}

export const getBestAoX = (solves, avgSize) => { //Returns best average of size avgSize in a set of solves.
    if(solves.length < avgSize) {
        return null
    } else if(solves.length === avgSize) {
        return getAvg(solves)
    } else {
        let bestAvg = 0

        for(let i = 0; i < solves.length - avgSize + 1; i++) {
            const avg = getAvg(solves.slice(i, i + avgSize))
            if(avg > bestAvg) {
                bestAvg = avg
            }
        }

        return bestAvg
    }
}
