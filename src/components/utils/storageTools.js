export const getTimes = (eventName) => {
    const times = JSON.parse(localStorage.getItem(eventName))

    if(times) {
        return times
    } else {
        return null
    }
}

export const saveTime = (eventName, time, penalty, scrambleString) => {
    const times = getTimes(eventName)

    if(times === null) {
        localStorage.setItem(eventName, JSON.stringify([{time: time, penalty: penalty, scramble: scrambleString}]))
    } else {
        localStorage.setItem(eventName, JSON.stringify([...times, {time: time, penalty: penalty, scramble: scrambleString}]))
    }
}

export const getCurrentTimes = (eventName, amount) => {
    const times = getTimes(eventName)

    if(times && times.length >= amount) {
        return times.slice(times.length - amount, times.length)
    } else {
        return null
    }
}