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
  | 'skbso'
  | 'sq1';

export type TimeEntryType = 'timer' | 'manual' | 'stackmat';

export type InspectionMode = 'always' | 'never' | 'nonbld';

export type AverageType = 'avg' | 'mean';

export interface Penalty {
  type: 'DNF' | '+2';
  amount?: number;
}

export interface PuzzleAverage {
  size: number;
  type: AverageType;
}

export interface PuzzleSolve {
  eventName: WCAEvent;
  time: number;
  penalty: Penalty | undefined;
  scramble: string;
  date: Date;
  solveId: string;
}

export interface SettingsInterface {
  timeEntryType: TimeEntryType;
  inspectionMode: InspectionMode;
  useVirtualInspection: boolean;
  averageDisplayType: AverageType;
  averageSizes: Array<number>;
}
