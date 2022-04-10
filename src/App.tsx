import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Casual from './components/screens/Casual';
import Analytics from './components/screens/Analytics';
import SolvesContext from './components/contexts/SolvesContext';
import { WCAEvent, PuzzleAverage, PuzzleSolve, TimeEntryType } from './types/index';
import { getSolves } from './components/utils/storageTools';
import Competetive from './components/screens/Competetive';

function App() {
  const [eventName, setEvent] = useState<WCAEvent>('333');
  const [solves, setSolves] = useState<PuzzleSolve[] | null>(null);
  const [timeEntryType, setTimeEntryTipe] = useState<TimeEntryType>('manual');
  const [avgsToDisplay, setAvgsToDisplay] = useState<Array<PuzzleAverage>>([
    { size: 5, type: 'avg' },
    { size: 12, type: 'avg' },
    { size: 50, type: 'avg' },
  ]);

  useEffect(() => {
    const times = getSolves(eventName);
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
            const solves = getSolves(eventName);
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
            <Competetive eventName={eventName} timeEntryType={timeEntryType} />
          </Route>
          <Route exact path="/analytics">
            <Analytics eventName={eventName} />
          </Route>
          <Route path="*">
            <Redirect to="/casual" />
          </Route>
        </Switch>
      </SolvesContext.Provider>
    </Router>
  );
}

export default App;
