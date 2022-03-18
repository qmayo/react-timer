import { PuzzleSolve } from '../../types';

export const getMean = (solves: Array<PuzzleSolve>): number | null => {
  //Returns mean of all times provided
  if (solves) {
    let dnfs = 0;
    solves.forEach((solve) => solve.penalty && solve.penalty.type === 'DNF' && dnfs++);
    if (dnfs < 2) {
      return solves.map((solve) => solve.time).reduce((a, b) => a + b) / solves.length;
    } else {
      return -1; // -1 signifies DNF
    }
  } else {
    return null;
  }
};

export const getAllMeans = (
  solves: Array<PuzzleSolve>,
  meanSize: number
): Array<{ solves: Array<PuzzleSolve>; average: number }> | null => {
  if (solves && solves.length >= meanSize) {
    if (solves.length === meanSize) {
      //@ts-ignore
      return [{ solves: solves, average: getMean(solves) }];
    } else {
      let allMeans = [];

      for (let i = 0; i < solves.length - meanSize + 1; i++) {
        const solvesSubset = solves.slice(i, i + meanSize);
        const mean = getMean(solvesSubset);
        allMeans.push({ solves: solvesSubset, average: mean });
      }
      //@ts-ignore
      return allMeans;
    }
  } else {
    return null;
  }
};

export const getBestMoX = (solves: Array<PuzzleSolve>, meanSize: number): number | null => {
  //Returns best mean of size meanSize in a set of times.
  if (solves && solves.length >= meanSize) {
    if (solves.length === meanSize) {
      return getMean(solves);
    } else {
      let bestMean = Infinity;

      for (let i = 0; i < solves.length - meanSize + 1; i++) {
        const solvesSubset = solves.slice(i, i + meanSize);
        let mean = getMean(solvesSubset);

        if (mean === -1) {
          if (!(bestMean === Infinity && i + 1 === solves.length - meanSize + 1)) {
            mean = Infinity;
          }
        }

        if (mean && mean < bestMean) {
          bestMean = mean;
        }
      }
      return bestMean === Infinity ? null : bestMean;
    }
  } else {
    return null;
  }
};

export const getWorstMoX = (solves: Array<PuzzleSolve>, meanSize: number): number | null => {
  //Returns worst mean of size meanSize in a set of times.
  if (solves && solves.length >= meanSize) {
    if (solves.length === meanSize) {
      return getMean(solves);
    } else {
      let worstMean = 0;

      for (let i = 0; i < solves.length - meanSize + 1; i++) {
        const solvesSubset = solves.slice(i, i + meanSize);
        let mean = getMean(solvesSubset);

        if (mean && mean > worstMean) {
          worstMean = mean;
        } else if (mean === -1) {
          worstMean = mean;
          break;
        }
      }
      return worstMean === 0 ? null : worstMean;
    }
  } else {
    return null;
  }
};

export const getAvg = (solves: Array<PuzzleSolve>): number | null => {
  //Averages all times provided using speed-cubing standards. Can be used for calculating current averages.
  if (solves) {
    if (solves.length === 1) {
      return solves[0].penalty && solves[0].penalty.type === 'DNF' ? -1 : solves[0].time;
    } else if (solves.length === 2) {
      let dnfs = 0;
      solves.forEach((solve) => solve.penalty && solve.penalty.type === 'DNF' && dnfs++);

      return dnfs > 0
        ? -1
        : solves.map((solve) => solve.time).reduce((a, b) => a + b) / solves.length;
    } else {
      const excludedTimes = Math.ceil(solves.length * 0.05);
      let clonedSolves = [...solves];
      let dnfs = 0;
      solves.forEach((solve) => solve.penalty && solve.penalty.type === 'DNF' && dnfs++);

      if (dnfs > 0) {
        if (dnfs > excludedTimes) {
          return -1;
        } else {
          for (let i = 0; i < excludedTimes; i++) {
            if (dnfs > 0) {
              clonedSolves.splice(
                clonedSolves.findIndex((solve) => solve.penalty && solve.penalty.type === 'DNF'),
                1
              );
              dnfs--;

              const min = Math.min(
                ...clonedSolves
                  .filter((solve) => (solve.time < 0 ? false : true))
                  .map((solve) => solve.time)
              );
              clonedSolves.splice(
                clonedSolves.findIndex((solve) => solve.time === min),
                1
              );
            } else {
              const min = Math.min(...clonedSolves.map((solve) => solve.time));
              const max = Math.max(...clonedSolves.map((solve) => solve.time));
              clonedSolves.splice(
                clonedSolves.findIndex((solve) => solve.time === min),
                1
              );
              clonedSolves.splice(
                clonedSolves.findIndex((solve) => solve.time === max),
                1
              );
            }
          }
          return (
            clonedSolves.map((solve) => solve.time).reduce((a, b) => a + b) / clonedSolves.length
          );
        }
      } else {
        for (let i = 0; i < excludedTimes; i++) {
          const min = Math.min(...clonedSolves.map((solve) => solve.time));
          const max = Math.max(...clonedSolves.map((solve) => solve.time));
          clonedSolves.splice(
            clonedSolves.findIndex((solve) => solve.time === min),
            1
          );
          clonedSolves.splice(
            clonedSolves.findIndex((solve) => solve.time === max),
            1
          );
        }
        return (
          clonedSolves.map((solve) => solve.time).reduce((a, b) => a + b) / clonedSolves.length
        );
      }
    }
  } else {
    return null;
  }
};

export const getAllAvgs = (
  solves: Array<PuzzleSolve>,
  avgSize: number
): Array<{ solves: Array<PuzzleSolve>; average: number }> | null => {
  //Returns list of all averages with their respective PuzzleSolve objects
  if (solves && solves.length >= avgSize) {
    if (solves.length === avgSize) {
      //@ts-ignore
      return [{ solves: solves, average: getAvg(solves) }];
    } else {
      let allAvgs = [];

      for (let i = 0; i < solves.length - avgSize + 1; i++) {
        const solvesSubset = solves.slice(i, i + avgSize);
        const avg = getAvg(solvesSubset);
        allAvgs.push({ solves: solvesSubset, average: avg });
      }
      //@ts-ignore
      return allAvgs;
    }
  } else {
    return null;
  }
};

export const getBestAoX = (solves: Array<PuzzleSolve>, avgSize: number): number | null => {
  //Returns best average of size avgSize in a set of times.
  if (solves && solves.length >= avgSize) {
    if (solves.length === avgSize) {
      return getAvg(solves);
    } else {
      let bestAvg = Infinity;

      for (let i = 0; i < solves.length - avgSize + 1; i++) {
        const solvesSubset = solves.slice(i, i + avgSize);
        let avg = getAvg(solvesSubset);

        if (avg === -1) {
          if (!(bestAvg === Infinity && i + 1 === solves.length - avgSize + 1)) {
            avg = Infinity;
          }
        }

        if (avg && avg < bestAvg) {
          bestAvg = avg;
        }
      }

      return bestAvg === Infinity ? null : bestAvg;
    }
  } else {
    return null;
  }
};

export const getWorstAoX = (solves: Array<PuzzleSolve>, avgSize: number): number | null => {
  //Returns worst average of size avgSize in a set of times.
  if (solves && solves.length > avgSize) {
    if (solves.length === avgSize) {
      return getAvg(solves);
    } else {
      let worstAvg = 0;

      for (let i = 0; i < solves.length - avgSize + 1; i++) {
        const solvesSubset = solves.slice(i, i + avgSize);
        let avg = getAvg(solvesSubset);

        if (avg && avg > worstAvg) {
          worstAvg = avg;
        } else if (avg === -1) {
          worstAvg = avg;
          break;
        }
      }

      return worstAvg === 0 ? null : worstAvg;
    }
  } else {
    return null;
  }
};
