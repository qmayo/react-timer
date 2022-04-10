import { WCAEvent, AverageType } from '../../types';

const averageTypeForEvent = (eventName: WCAEvent): AverageType => {
    if (['666wca', '777wca', '333ni', '444bld', '555bld'].includes(eventName)) {
        return 'mean';
    } else {
        return 'avg';
    }
}

export default averageTypeForEvent;