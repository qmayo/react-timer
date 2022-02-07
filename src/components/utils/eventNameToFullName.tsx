import { WCAEvent } from "../../types";

const eventNameToFullName = (eventName: WCAEvent) => {
    switch (eventName) {
        case '222so':
            return '2x2x2';
        case '333':
            return '3x3x3';
        case '444wca':
            return '4x4x4';
        case '555wca':
            return '5x5x5';
        case '666wca':
            return '6x6x6';
        case '777wca':
            return '7x7x7';
        case '333ni':
            return '3x3x3 BLD';
        case '444bld':
            return '4x4x4 BLD';
        case '555bld':
            return '5x5x5';
        case '333oh':
            return '3x3x3 OH'
        case 'clkwca':
            return 'Clock';
        case 'mgmp':
            return 'Megaminx';
        case 'pyrso':
            return 'Pyraminx';
        case 'skbso':
            return "Skewb";
        case 'sq1':
            return 'Square-one';
    }
}

export default eventNameToFullName;