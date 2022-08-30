import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Casual from './components/screens/Casual';
import Analytics from './components/screens/Analytics';
import SolvesContext from './components/contexts/SolvesContext';
import { WCAEvent, PuzzleSolve, TimeEntryType, InspectionMode, AverageType } from './types/index';
import { getSolves } from './components/utils/storageTools';
import Competetive from './components/screens/Competetive';

function App() {
  const [eventName, setEvent] = useState<WCAEvent>('333');
  const [solves, setSolves] = useState<PuzzleSolve[] | null>(null);
  const [timeEntryType, setTimeEntryType] = useState<TimeEntryType>('timer');
  const [inspectionMode, setInspectionMode] = useState<InspectionMode>('never'); //TODO: implement nonbld in timer lib
  const [useVirtualInspection, setUseVirtualInspection] = useState<boolean>(false);
  const [averageDisplayType, setAverageDisplayType] = useState<AverageType>('avg');
  const [averageSizes, setAverageSizes] = useState<Array<number>>([
    5, 12, 50
  ])

  useEffect(() => {
    const times = getSolves(eventName);
    setSolves(times);
  }, [eventName]);

  return (
    <Router>
      <Navbar
        eventName={eventName}
        changeEvent={setEvent}
        timeEntryType={timeEntryType}
        setTimeEntryType={setTimeEntryType}
        inspectionMode={inspectionMode}
        setInspectionMode={setInspectionMode}
        useVirtualInspection={useVirtualInspection}
        setUseVirtualInspection={setUseVirtualInspection}
        averageDisplayType={averageDisplayType}
        setAverageDisplayType={setAverageDisplayType}
        averageSizes={averageSizes}
        setAverageSizes={setAverageSizes}
      />
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
              avgsToDisplay={[
                {
                  size: averageSizes[0],
                  type: averageDisplayType,
                },
                {
                  size: averageSizes[1],
                  type: averageDisplayType,
                },
                {
                  size: averageSizes[2],
                  type: averageDisplayType,
                },
              ]}
              timeEntryType={timeEntryType}
              inspectionMode={inspectionMode}
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
