import { useContext } from 'react';
import Card from '../sections/Card';
import {
  getMean,
  getBestMoX,
  getWorstMoX,
  getAvg,
  getBestAoX,
  getWorstAoX,
} from './sessionStatisticsTools';
import { PuzzleAverage, WCAEvent } from '../../types';
import { nanoid } from 'nanoid';
import millisecondsToHHMMSSDD from './millisecondsToHHMMSSDD';
import SolvesContext from '../contexts/SolvesContext';

const AverageCards = (avgsToDisplay: Array<PuzzleAverage>, eventName: WCAEvent) => {
  const { solves } = useContext(SolvesContext);

  return avgsToDisplay.map((avg) => {
    if (solves) {
      if (avg.type === 'avg') {
        let currentAvgStr,
          bestAvgStr,
          worstAvgStr = '';

        if (solves.length >= avg.size) {
          const currentAvg = getAvg(solves.slice(-avg.size));
          if (currentAvg) {
            currentAvgStr = millisecondsToHHMMSSDD(currentAvg);
          }

          const bestAvg = getBestAoX(solves, avg.size);
          if (bestAvg) {
            bestAvgStr = millisecondsToHHMMSSDD(bestAvg);
          }

          const worstAvg = getWorstAoX(solves, avg.size);
          if (worstAvg) {
            worstAvgStr = millisecondsToHHMMSSDD(worstAvg);
          }
        }

        return (
          <Card key={nanoid(5)}>
            <h4 className="title is-4">{`Ao${avg.size}`}:</h4>
            <p>Current: {currentAvgStr || 'N/A'}</p>
            <p>Best: {bestAvgStr || 'N/A'}</p>
            <p>Worst: {worstAvgStr || 'N/A'}</p>
          </Card>
        );
      } else {
        let currentMeanStr,
          bestMeanStr,
          worstMeanStr = '';

        if (solves.length >= avg.size) {
          const currentMean = getMean(solves.slice(-avg.size));
          if (currentMean) {
            currentMeanStr = millisecondsToHHMMSSDD(currentMean);
          }

          const bestMean = getBestMoX(solves, avg.size);
          if (bestMean) {
            bestMeanStr = millisecondsToHHMMSSDD(bestMean);
          }

          const worstMean = getWorstMoX(solves, avg.size);
          if (worstMean) {
            worstMeanStr = millisecondsToHHMMSSDD(worstMean);
          }
        }

        return (
          <Card key={nanoid(5)}>
            <h4 className="title is-4">{`Ao${avg.size}`}:</h4>
            <p>Current: {currentMeanStr || 'N/A'}</p>
            <p>Best: {bestMeanStr || 'N/A'}</p>
            <p>Worst: {worstMeanStr || 'N/A'}</p>
          </Card>
        );
      }
    } else {
      return (
        <Card key={nanoid(5)}>
            <h4 className="title is-4">{avg.type === 'avg' ? `Ao${avg.size}` : `Mo${avg.size}`}:</h4>
            <p>Current: {'N/A'}</p>
            <p>Best: {'N/A'}</p>
            <p>Worst: {'N/A'}</p>
          </Card>
      )
    }
  });
};

export default AverageCards;
