export const getMean = (times: Array<number>): number | null => {
  //Returns mean of all times provided
  return times ? times.reduce((a, b) => a + b) / times.length : null;
};

export const getBestMoX = (times: Array<number>, meanSize: number): number | null => {
  //Returns best mean of size meanSize in a set of times.
  if (times === null || times.length < meanSize) {
    return null;
  } else if (times.length === meanSize) {
    return getMean(times);
  } else {
    let bestMean = Infinity;

    for (let i = 0; i < times.length - meanSize + 1; i++) {
      const mean = getMean(times.slice(i, i + meanSize));
      // @ts-ignore
      if (mean < bestMean) {
        // @ts-ignore
        bestMean = mean;
      }
    }
    return bestMean === Infinity ? null : bestMean;
  }
};

export const getWorstMoX = (times: Array<number>, meanSize: number): number | null => {
  //Returns worst mean of size meanSize in a set of times.
  if (times === null || times.length < meanSize) {
    return null;
  } else if (times.length === meanSize) {
    return getMean(times);
  } else {
    let worstMean = 0;

    for (let i = 0; i < times.length - meanSize + 1; i++) {
      const mean = getMean(times.slice(i, i + meanSize));
      // @ts-ignore
      if (mean > worstMean) {
        // @ts-ignore
        worstMean = mean;
      }
    }
    return worstMean === 0 ? null : worstMean;
  }
};

export const getAvg = (times: Array<number>): number | null => {
  //Averages all times provided using speed-cubing standards. Can be used for calculating current averages.
  if (times) {
    if (times.length === 1) {
      return times[0];
    } else if (times.length === 2) {
      return times.reduce((a, b) => a + b) / times.length;
    } else {
      const excludedtimes = Math.ceil(times.length * 0.05);
      let clonedTimes = [...times]; //Call-by-sharing shenanigans

      for (let i = 0; i < excludedtimes; i++) {
        const min = Math.min(...clonedTimes);
        const max = Math.max(...clonedTimes);
        clonedTimes.splice(
          times.findIndex((time) => time === min),
          1
        );
        clonedTimes.splice(
          times.findIndex((time) => time === max),
          1
        );
      }
      return clonedTimes.reduce((a, b) => a + b) / clonedTimes.length;
    }
  } else {
    return null;
  }
};

export const getBestAoX = (times: Array<number>, avgSize: number): number | null => {
  //Returns best average of size avgSize in a set of times.
  if (times === null || times.length < avgSize) {
    return null;
  } else if (times.length === avgSize) {
    return getAvg(times);
  } else {
    let bestAvg = Infinity;

    for (let i = 0; i < times.length - avgSize + 1; i++) {
      const avg = getAvg(times.slice(i, i + avgSize));
      // @ts-ignore
      if (avg < bestAvg) {
        // @ts-ignore
        bestAvg = avg;
      }
    }

    return bestAvg === Infinity ? null : bestAvg;
  }
};

export const getWorstAoX = (times: Array<number>, avgSize: number): number | null => {
  //Returns worst average of size avgSize in a set of times.
  if (times === null || times.length < avgSize) {
    return null;
  } else if (times.length === avgSize) {
    return getAvg(times);
  } else {
    let worstAvg = 0;

    for (let i = 0; i < times.length - avgSize + 1; i++) {
      const avg = getAvg(times.slice(i, i + avgSize));
      // @ts-ignore
      if (avg > worstAvg) {
        // @ts-ignore
        worstAvg = avg;
      }
    }

    return worstAvg === 0 ? null : worstAvg;
  }
};
