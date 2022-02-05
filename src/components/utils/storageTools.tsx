import { Penalty, PuzzleSolve, WCAEvent } from '../../types';

export const getTimes = (eventName: WCAEvent): Array<PuzzleSolve> | null => {
  const unparsedTimes = localStorage.getItem(eventName);
  let times: Array<PuzzleSolve> | null;

  unparsedTimes ? (times = JSON.parse(unparsedTimes)) : (times = null);

  if (times) {
    return times;
  } else {
    return null;
  }
};

export const getCurrentTimes = (eventName: WCAEvent, amount: number): Array<PuzzleSolve> | null => {
  const times = getTimes(eventName);

  if (times && times.length >= amount) {
    return times.slice(times.length - amount, times.length);
  } else {
    return null;
  }
};

export const saveTime = (
  eventName: WCAEvent,
  time: number,
  penalty: Penalty,
  scrambleString: string,
  solveId: string
): void => {
  const times = getTimes(eventName);

  if (times === null) {
    localStorage.setItem(
      eventName,
      JSON.stringify([{ time: time, penalty: penalty, scramble: scrambleString, solveId: solveId }])
    );
  } else {
    localStorage.setItem(
      eventName,
      JSON.stringify([
        ...times,
        { time: time, penalty: penalty, scramble: scrambleString, solveId: solveId },
      ])
    );
  }
};

export const changePenaltyOfTime = (eventName: WCAEvent, solveId: string, penalty: Penalty) => {
  const times = getTimes(eventName);

  if (times) {
    const time = times.find((time) => {
      return time.solveId === solveId;
    });

    if (time) {
      const index = times.indexOf(time);
      if (JSON.stringify(time.penalty) !== JSON.stringify(penalty)) {
        let penalizedTime = time;
        penalizedTime.penalty = penalty;
        times[index] = penalizedTime;
        localStorage.setItem(eventName, JSON.stringify(times));
      } else {
        let unPenalizedTime = time;
        delete unPenalizedTime.penalty;
        times[index] = unPenalizedTime;
        localStorage.setItem(eventName, JSON.stringify(times));
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const changePenaltyOfCurrentTime = (eventName: WCAEvent, penalty: Penalty) => {
  const times = getTimes(eventName);

  if (times) {
    const time = times[times.length - 1];
    if (JSON.stringify(time.penalty) !== JSON.stringify(penalty)) {
      let penalizedTime = time;
      penalizedTime.penalty = penalty;

      times[times.length - 1] = penalizedTime;
      localStorage.setItem(eventName, JSON.stringify(times));
    } else {
      let unPenalizedTime = time;
      delete unPenalizedTime.penalty;

      times[times.length - 1] = unPenalizedTime;
      localStorage.setItem(eventName, JSON.stringify(times));
    }
  } else {
    return false;
  }
};
