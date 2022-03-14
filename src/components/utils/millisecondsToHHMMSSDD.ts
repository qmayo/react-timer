const millisecondsToHHMMSSDD = (num: number): string => {
    let seconds = num / 1000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60)
    if (hours) {
        seconds = seconds % 3600

        if (minutes) {
            seconds = seconds % 60
            return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds.toFixed(2)}`
        } else {
            return `${hours}:00:${seconds < 10 ? "0" + seconds.toFixed(2) : seconds.toFixed(2)}`
        }
    } else if (minutes) {
    	seconds = seconds % 60;
      return `${minutes}:${seconds < 10 ? "0" + seconds.toFixed(2) : seconds.toFixed(2)}`
    } else {
      return seconds.toFixed(2)
    }
    
    
}

export default millisecondsToHHMMSSDD;