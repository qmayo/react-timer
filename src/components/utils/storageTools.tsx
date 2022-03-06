import { Penalty, PuzzleSolve, WCAEvent } from '../../types';

export const getSolves = (eventName: WCAEvent): Array<PuzzleSolve> | null => {
  const unparsedSolves = localStorage.getItem(eventName);
  let solves: Array<PuzzleSolve> | null;

  unparsedSolves ? (solves = JSON.parse(unparsedSolves)) : (solves = null);

  if (solves && solves.length !== 0) {
    return solves;
  } else {
    return null;
  }
};

export const getCurrentSolves = (eventName: WCAEvent, amount: number): Array<PuzzleSolve> | null => {
  const solves = getSolves(eventName);

  if (solves && solves.length >= amount) {
    return solves.slice(solves.length - amount, solves.length);
  } else {
    return null;
  }
};

/* export const getSolve = (eventName: WCAEvent, solveId: string):  => {
  const solves = getSolves(eventName);

  if (solves && solves.length !== 0) {
    const solve = solves.find((solve) => {
      return solve.solveId === solveId;
    })


  }
} */

export const saveSolve = (
  eventName: WCAEvent,
  time: number,
  penalty: Penalty,
  scrambleString: string,
  date: Date,
  solveId: string
): void => {
  const solves = getSolves(eventName);

  if (solves === null) {
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
        ...solves,
        { time: time, penalty: penalty, scramble: scrambleString, date: date, solveId: solveId },
      ])
    );
  }
};

export const deleteSolve = (eventName: WCAEvent, solveId: string): void => {
  const solves = getSolves(eventName);

  if (solves && solves.length !== 0) {
    const solve = solves.find((solve) => {
      return solve.solveId === solveId;
    });

    if (solve) {
      const index = solves.indexOf(solve);
      solves.splice(index, 1);
      localStorage.setItem(eventName, JSON.stringify(solves));
    }
  }
};

export const deleteCurrentSolve = (eventName: WCAEvent): void => {
  const solves = getSolves(eventName);

  if (solves && solves.length !== 0) {
    solves.splice(solves.length - 1, 1);
    localStorage.setItem(eventName, JSON.stringify(solves));
  }
};

export const changePenaltyOfSolve = (
  eventName: WCAEvent,
  solveId: string,
  penalty: Penalty
): void => {
  const solves = getSolves(eventName);

  if (solves && solves.length !== 0) {
    const solve = solves.find((solve) => {
      return solve.solveId === solveId;
    });

    if (solve && solve.time !== -1) {
      const index = solves.indexOf(solve);
      if (JSON.stringify(solve.penalty) !== JSON.stringify(penalty)) {
        let penalizedSolve = solve;

        if (penalty.type === '+2') {
          penalizedSolve.time = penalizedSolve.time + 2000;
          penalizedSolve.penalty = penalty;
        } else {
          if (solve.penalty) {
            if (solve.penalty.type === '+2') { //Change from +2 to DNF if already +2; Else set DNF
              penalizedSolve.time = solve.time - 2000;
              penalizedSolve.penalty = penalty;
            }
          } else {
            penalizedSolve.penalty = penalty;
          }
        }

        solves[index] = penalizedSolve;
        localStorage.setItem(eventName, JSON.stringify(solves));
      } else {
        let unPenalizedSolve = solve;
        delete unPenalizedSolve.penalty;

        if (penalty.type === '+2') {
          unPenalizedSolve.time = unPenalizedSolve.time - 2000;
        }

        solves[index] = unPenalizedSolve;
        localStorage.setItem(eventName, JSON.stringify(solves));
      }
    }
  }
};

export const changePenaltyOfCurrentSolve = (eventName: WCAEvent, penalty: Penalty): void => {
  const solves = getSolves(eventName);

  if (solves && solves.length !== 0) {
    const solve = solves[solves.length - 1];
    if (solve.time !== -1) {
      if (JSON.stringify(solve.penalty) !== JSON.stringify(penalty)) {
        let penalizedSolve = solve;

        if (penalty.type === '+2') {
          penalizedSolve.time = penalizedSolve.time + 2000;
          penalizedSolve.penalty = penalty;
        } else {
          if (solve.penalty) {
            if (solve.penalty.type === '+2') { //Change from +2 to DNF if already +2; Else set DNF
              penalizedSolve.time = solve.time - 2000;
              penalizedSolve.penalty = penalty;
            }
          } else {
            penalizedSolve.penalty = penalty;
          }
        }

        solves[solves.length - 1] = penalizedSolve;
        localStorage.setItem(eventName, JSON.stringify(solves));
      } else {
        let unPenalizedTime = solve;
        delete unPenalizedTime.penalty;

        if (penalty.type === '+2') {
          unPenalizedTime.time = unPenalizedTime.time - 2000;
        }

        solves[solves.length - 1] = unPenalizedTime;
        localStorage.setItem(eventName, JSON.stringify(solves));
      }
    }
  }
};
