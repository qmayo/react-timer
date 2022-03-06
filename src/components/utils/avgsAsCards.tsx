import Card from '../sections/Card';
import {
  getMean,
  getBestMoX,
  getWorstMoX,
  getAvg,
  getBestAoX,
  getWorstAoX,
} from './sessionStatisticsTools';
import { getSolves, getCurrentSolves } from './storageTools';
import { PuzzleAverage, WCAEvent } from '../../types';
import { nanoid } from 'nanoid';
import millisecondsToHHMMSSDD from './millisecondsToHHMMSSDD';

const avgsAsCards = (avgsToDisplay: Array<PuzzleAverage>, eventName: WCAEvent) => {
  return avgsToDisplay.map((avg) => {
    if (avg.type === 'avg') {
      let currentAverage, bestAverage, worstAverage;
      let currentAverageStr, bestAverageStr, worstAverageStr;

      let currentTimes = getCurrentSolves(eventName, avg.size);
      currentTimes // @ts-ignore
        ? (currentTimes = currentTimes.map((solve) => (solve.time)))
        : (currentTimes = null);

      let times = getSolves(eventName); // @ts-ignore
      times ? (times = times.map((solve) => (solve.time))) : (times = null);

      if (currentTimes) {
        // @ts-ignore
        currentAverageStr = millisecondsToHHMMSSDD(getAvg(currentTimes));
      }

      if (times) {
        // @ts-ignore
        bestAverage = getBestAoX(times, avg.size);
        if (bestAverage) {
          bestAverageStr = millisecondsToHHMMSSDD(bestAverage);
        }
        // @ts-ignore
        worstAverage = getWorstAoX(times, avg.size);
        if (worstAverage) {
          worstAverageStr = millisecondsToHHMMSSDD(worstAverage);
        }
      }

      return (
        <Card key={nanoid(5)}>
          <h4 className="title is-4">{`Ao${avg.size}`}:</h4>
          <p>Current: {currentAverageStr || 'N/A'}</p>
          <p>Best: {bestAverageStr || 'N/A'}</p>
          <p>Worst: {worstAverageStr || 'N/A'}</p>
        </Card>
      );
    } else {
      //avg.type === 'mean'
      let currentMean, bestMean, worstMean;
      let currentMeanStr, bestMeanStr, worstMeanStr;

      let currentTimes = getCurrentSolves(eventName, avg.size);
      currentTimes // @ts-ignore
        ? (currentTimes = currentTimes.map((solve) => solve.time))
        : (currentTimes = null);

      let times = getSolves(eventName); // @ts-ignore
      times ? (times = times.map((solve) => solve.time)) : (times = null);

      if (currentTimes) {
        // @ts-ignore
        currentMeanStr = millisecondsToHHMMSSDD(getMean(currentTimes));
      }

      if (times) {
        // @ts-ignore
        bestMean = getBestMoX(times, avg.size);
        if (bestMean) {
          bestMeanStr = millisecondsToHHMMSSDD(bestMean);
        }
        // @ts-ignore
        worstMean = getWorstMoX(times, avg.size);
        if (worstMean) {
          worstMeanStr = millisecondsToHHMMSSDD(worstMean);
        }
      }

      return (
        <Card key={nanoid(5)}>
          <h4 className="title is-4">{`Mo${avg.size}`}:</h4>
          <p>Current: {currentMeanStr || 'N/A'}</p>
          <p>Best: {bestMeanStr || 'N/A'}</p>
          <p>Worst: {worstMeanStr || 'N/A'}</p>
        </Card>
      );
    }
  });
};

export default avgsAsCards;
