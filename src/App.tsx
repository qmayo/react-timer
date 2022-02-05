import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Casual from './components/Casual';
import { WCAEvent, PuzzleAverage } from './types/index';

function App() {
  const [eventName, setEvent] = useState<WCAEvent>('333');
  const [avgsToDisplay, setAvgsToDisplay] = useState<Array<PuzzleAverage>>([
    { size: 5, type: 'avg' },
    { size: 12, type: 'avg' },
    { size: 50, type: 'avg' },
  ]);

  return (
    <Router>
      <Navbar eventName={eventName} changeEvent={setEvent} />
      <Switch>
        <Route path="/casual">
          <Casual eventName={eventName} avgsToDisplay={avgsToDisplay} />
        </Route>
        <Route path="/competetive">
          <div className="Competetive"></div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
