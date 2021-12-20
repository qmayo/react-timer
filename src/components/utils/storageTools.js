export const getTimes = (eventName) => {
    return JSON.parse(localStorage.getItem(eventName))
}

export const saveTime = (eventName, time, penalty) => {
    const times = getTimes(eventName)

    if(times === null) {
        localStorage.setItem(eventName, JSON.stringify([{time: time, penalty: penalty}]))
    } else {
        localStorage.setItem(eventName, JSON.stringify([...times, {time: time, penalty: penalty}]))
    }
}

export const getCurrentTimes = (eventName, amount) => {
    const times = getTimes(eventName)
    return JSON.parse(times.splice[times.length - amount - 1, times.length - 1])
}