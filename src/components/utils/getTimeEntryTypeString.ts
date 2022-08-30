import { TimeEntryType } from '../../types';

const getTimeEntryTypeString = (timeEntryType: TimeEntryType): string => {
  /* prob move to utils later */
  switch (timeEntryType) {
    case 'timer':
      return 'Virtual timer';
    case 'manual':
      return 'Manual entry';
    case 'stackmat':
      return 'Stackmat';
  }
};

export default getTimeEntryTypeString;
