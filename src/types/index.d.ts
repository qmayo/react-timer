export type WCAEvent =
  | '222so'
  | '333'
  | '444wca'
  | '555wca'
  | '666wca'
  | '777wca'
  | '333ni'
  | '444bld'
  | '555bld'
  | '333oh'
  | 'clkwca'
  | 'mgmp'
  | 'pyrso'
  | 'skbso'; //Add Square-one when scramble generator works for it

export interface Penalty {
  type: 'DNF' | '+2';
  amount?: number;
}

export interface PuzzleAverage {
  size: number;
  type: 'avg' | 'mean';
}

export interface PuzzleSolve {
  eventName: WCAEvent;
  time: number;
  penalty: Penalty | undefined;
  scramble: string;
  date: Date;
  solveId: string;
}
