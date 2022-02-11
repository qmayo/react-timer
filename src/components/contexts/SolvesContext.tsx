import React, { createContext } from 'react';
import { PuzzleSolve } from '../../types';

export interface SolvesContextInterface {
  solves: PuzzleSolve[] | null;
  updateSolves: () => void;
}

const SolvesContext = createContext<SolvesContextInterface>(
  undefined as unknown as SolvesContextInterface
);

export default SolvesContext;
