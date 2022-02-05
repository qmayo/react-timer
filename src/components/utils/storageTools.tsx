import { Penalty, PuzzleSolve, WCAEvent } from '../../types';

export const getTimes = (eventName: WCAEvent): Array<PuzzleSolve> | null => {
  const unparsedTimes = localStorage.getItem(eventName);
  let times: Array<PuzzleSolve> | null;

  unparsedTimes ? (times = JSON.parse(unparsedTimes)) : (times = null);

  if (times && times.length !== 0) {
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
  date: Date,
  solveId: string
): void => {
  const times = getTimes(eventName);

  if (times === null) {
    localStorage.setItem(
      eventName,
      JSON.stringify([
        { time: time, penalty: penalty, scramble: scrambleString, date: date, solveId: solveId },
      ])
    );
  } else {
    localStorage.setItem(
      eventName,
      JSON.stringify([
        ...times,
        { time: time, penalty: penalty, scramble: scrambleString, date: date, solveId: solveId },
      ])
    );
  }
};

export const deleteTime = (eventName: WCAEvent, solveId: string): void => {
  const times = getTimes(eventName);

  if (times && times.length !== 0) {
    const time = times.find((time) => {
      return time.solveId === solveId;
    });

    if (time) {
      const index = times.indexOf(time);
      times.splice(index, 1);
      localStorage.setItem(eventName, JSON.stringify(times));
    }
  }
};

export const deleteCurrentTime = (eventName: WCAEvent): void => {
  const times = getTimes(eventName);

  if (times && times.length !== 0) {
    times.splice(times.length - 1, 1);
    localStorage.setItem(eventName, JSON.stringify(times));
  }
};

export const changePenaltyOfTime = (
  eventName: WCAEvent,
  solveId: string,
  penalty: Penalty
): void => {
  const times = getTimes(eventName);

  if (times && times.length !== 0) {
    const time = times.find((time) => {
      return time.solveId === solveId;
    });

    if (time && time.time !== -1) {
      const index = times.indexOf(time);
      if (JSON.stringify(time.penalty) !== JSON.stringify(penalty)) {
        let penalizedTime = time;

        if (penalty.type === '+2') {
          penalizedTime.time = penalizedTime.time + 2000;
          penalizedTime.penalty = penalty;
        } else {
          if (time.penalty) {
            if (time.penalty.type === '+2') {
              penalizedTime.time = time.time - 2000;
              penalizedTime.penalty = penalty;
            }
          } else {
            penalizedTime.penalty = penalty;
          }
        }

        times[index] = penalizedTime;
        localStorage.setItem(eventName, JSON.stringify(times));
      } else {
        let unPenalizedTime = time;
        delete unPenalizedTime.penalty;

        if (penalty.type === '+2') {
          unPenalizedTime.time = unPenalizedTime.time - 2000;
        }

        times[index] = unPenalizedTime;
        localStorage.setItem(eventName, JSON.stringify(times));
      }
    }
  }
};

export const changePenaltyOfCurrentTime = (eventName: WCAEvent, penalty: Penalty): void => {
  const times = getTimes(eventName);

  if (times && times.length !== 0) {
    const time = times[times.length - 1];
    if (time.time !== -1) {
      if (JSON.stringify(time.penalty) !== JSON.stringify(penalty)) {
        let penalizedTime = time;

        if (penalty.type === '+2') {
          penalizedTime.time = penalizedTime.time + 2000;
          penalizedTime.penalty = penalty;
        } else {
          if (time.penalty) {
            if (time.penalty.type === '+2') {
              penalizedTime.time = time.time - 2000;
              penalizedTime.penalty = penalty;
            }
          } else {
            penalizedTime.penalty = penalty;
          }
        }

        times[times.length - 1] = penalizedTime;
        localStorage.setItem(eventName, JSON.stringify(times));
      } else {
        let unPenalizedTime = time;
        delete unPenalizedTime.penalty;

        if (penalty.type === '+2') {
          unPenalizedTime.time = unPenalizedTime.time - 2000;
        }

        times[times.length - 1] = unPenalizedTime;
        localStorage.setItem(eventName, JSON.stringify(times));
      }
    }
  }
};
