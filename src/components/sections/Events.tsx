import React from 'react';
import { WCAEvent } from '../../types';

interface EventsProps {
  eventName: WCAEvent;
  changeEvent: any;
}

const Events = ({ eventName, changeEvent }: EventsProps) => {
  const setEventHelper = (e: any): void => {
    e.preventDefault();
    changeEvent(e.target.value);
  };

  return (
    <div>
      <button className="button is-ghost has-text-white" value="222so" onClick={setEventHelper}>
        2x2x2
      </button>
      <button className="button is-ghost has-text-white" value="333" onClick={setEventHelper}>
        3x3x3
      </button>
      <button className="button is-ghost has-text-white" value="444wca" onClick={setEventHelper}>
        4x4x4
      </button>
      <button className="button is-ghost has-text-white" value="555wca" onClick={setEventHelper}>
        5x5x5
      </button>
      <button className="button is-ghost has-text-white" value="666wca" onClick={setEventHelper}>
        6x6x6
      </button>
      <button className="button is-ghost has-text-white" value="777wca" onClick={setEventHelper}>
        7x7x7
      </button>
      <button className="button is-ghost has-text-white" value="333ni" onClick={setEventHelper}>
        3x3x3 BLD
      </button>
      <button className="button is-ghost has-text-white" value="444bld" onClick={setEventHelper}>
        4x4x4 BLD
      </button>
      <button className="button is-ghost has-text-white" value="555bld" onClick={setEventHelper}>
        5x5x5 BLD
      </button>
      <button className="button is-ghost has-text-white" value="333oh" onClick={setEventHelper}>
        3x3x3 OH
      </button>
      <button className="button is-ghost has-text-white" value="clkwca" onClick={setEventHelper}>
        Clock
      </button>
      <button className="button is-ghost has-text-white" value="mgmp" onClick={setEventHelper}>
        Megaminx
      </button>
      <button className="button is-ghost has-text-white" value="pyrso" onClick={setEventHelper}>
        Pyraminx
      </button>
      <button className="button is-ghost has-text-white" value="skbso" onClick={setEventHelper}>
        Skewb
      </button>
      {/* <button className="button is-ghost has-text-white" value="sq1" onClick={setEventHelper}>SQ-1</button> */}
    </div>
  );
};

export default Events;
