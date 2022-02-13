import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Casual from './components/screens/Casual';
import Analytics from './components/screens/Analytics';
import SolvesContext from './components/contexts/SolvesContext';
import { WCAEvent, PuzzleAverage, PuzzleSolve, TimeEntryType } from './types/index';
import { getTimes } from './components/utils/storageTools';

function App() {
  const [eventName, setEvent] = useState<WCAEvent>('333');
  const [solves, setSolves] = useState<PuzzleSolve[] | null>(null);
  const [timeEntryType, setTimeEntryTipe] = useState<TimeEntryType>('timer');
  const [avgsToDisplay, setAvgsToDisplay] = useState<Array<PuzzleAverage>>([
    { size: 5, type: 'avg' },
    { size: 12, type: 'avg' },
    { size: 50, type: 'avg' },
  ]);

  useEffect(() => {
    const times = getTimes(eventName);
    setSolves(times);
  }, [eventName]);

  return (
    <Router>
      <Navbar eventName={eventName} changeEvent={setEvent} />
      <SolvesContext.Provider
        value={{
          solves: solves,
          updateSolves: () => {
            //NEEDS TO BE CALLED WHENEVER SOLVES ARE CHANGED IN LOCALSTORAGE
            const solves = getTimes(eventName);
            setSolves(solves);
          },
        }}
      >
        <Switch>
          <Route exact path="/casual">
            <Casual
              eventName={eventName}
              avgsToDisplay={avgsToDisplay}
              timeEntryType={timeEntryType}
            />
          </Route>
          <Route exact path="/competetive">
            <div className="Competetive"></div>
          </Route>
          <Route exact path="/analytics">
            <Analytics eventName={eventName} />
          </Route>
        </Switch>
      </SolvesContext.Provider>
    </Router>
  );
}

export default App;
