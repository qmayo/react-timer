const HHMMSSDDToMs = (num: number): number => { //INPUT HH:MM.SS.DD
    const str = String(num);
    const len = str.length;
  
    const decisecondsAsMs = Number(str.substring(str.length - 2, str.length)) * 10;
    console.log(decisecondsAsMs)
    const secondsAsMs = Number(str.substring(str.length - 4, str.length - 2)) * 1000;
    console.log(secondsAsMs)
    const minutesAsMs = Number(str.substring(str.length - 6, str.length - 4)) * 60000;
    console.log(minutesAsMs)
    const hoursAsMs = Number(str.substring(str.length - 8, str.length - 6)) * 3600000;
    console.log(hoursAsMs)
  
    return decisecondsAsMs + secondsAsMs + minutesAsMs + hoursAsMs
}

export default HHMMSSDDToMs;