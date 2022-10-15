import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Casual from './components/screens/Casual';
import Analytics from './components/screens/Analytics';
import SolvesContext from './components/contexts/SolvesContext';
import SettingsContext from './components/contexts/SettingsContext';
import {
  WCAEvent,
  PuzzleSolve,
  TimeEntryType,
  InspectionMode,
  AverageType,
  SettingsInterface,
} from './types/index';
import { getSettings, getSolves, saveSettings } from './components/utils/storageTools';
import Competetive from './components/screens/Competetive';

function App() {
  const [eventName, setEvent] = useState<WCAEvent>('333');
  const [solves, setSolves] = useState<PuzzleSolve[] | null>(null);
  const ambientNoiseRef = useRef<HTMLMediaElement>(new Audio(process.env.PUBLIC_URL + '/cubing-ambience.mp3'));

  //SETTINGS
  const [timeEntryType, setTimeEntryType] = useState<TimeEntryType>('timer');
  const [inspectionMode, setInspectionMode] = useState<InspectionMode>('never'); //TODO: implement nonbld
  const [useVirtualInspection, setUseVirtualInspection] = useState<boolean>(false);
  const [averageDisplayType, setAverageDisplayType] = useState<AverageType>('avg');
  const [averageSizes, setAverageSizes] = useState<Array<number>>([5, 12, 50]);
  const [ambientNoise, setAmbientNoise] = useState<boolean>(false);

  const updateSettings = (settings: SettingsInterface): void => {
    setTimeEntryType(settings.timeEntryType);
    setInspectionMode(settings.inspectionMode);
    setUseVirtualInspection(settings.useVirtualInspection);
    setAverageDisplayType(settings.averageDisplayType);
    setAverageSizes(settings.averageSizes);
    //setAmbientNoise(settings.ambientNoise);
  };

  useEffect(() => {
    const settings = getSettings();

    if (settings) {
      console.log(settings.inspectionMode);
      updateSettings(settings);
      setAmbientNoise(false); //Unlikely this is wanted to play immediately.
    }
  }, []);

  useEffect(() => {
    const settings = {
      timeEntryType: timeEntryType,
      inspectionMode: inspectionMode,
      useVirtualInspection: useVirtualInspection,
      averageDisplayType: averageDisplayType,
      averageSizes: averageSizes,
      ambientNoise: ambientNoise,
    };
    saveSettings(settings);
  }, [timeEntryType, inspectionMode, useVirtualInspection, averageDisplayType, averageSizes]);

  useEffect(() => {
    const times = getSolves(eventName);
    setSolves(times);
  }, [eventName]);

  useEffect(() => {
    if (ambientNoise) {
      ambientNoiseRef.current.play();
    } else {
      ambientNoiseRef.current.pause();
    }
    
  }, [ambientNoise])

  return (
    <Router>
      <SettingsContext.Provider
        value={{
          timeEntryType: timeEntryType,
          setTimeEntryType: setTimeEntryType,
          inspectionMode: inspectionMode,
          setInspectionMode: setInspectionMode,
          useVirtualInspection: useVirtualInspection,
          setUseVirtualInspection: setUseVirtualInspection,
          averageDisplayType: averageDisplayType,
          setAverageDisplayType: setAverageDisplayType,
          averageSizes: averageSizes,
          setAverageSizes: setAverageSizes,
          ambientNoise: ambientNoise,
          setAmbientNoise: setAmbientNoise,
        }}
      >
        <Navbar
          eventName={eventName}
          changeEvent={setEvent}
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
              />
            </Route>
            <Route exact path="/competetive">
              <Competetive eventName={eventName} />
            </Route>
            <Route exact path="/analytics">
              <Analytics eventName={eventName} />
            </Route>
            <Route path="*">
              <Redirect to="/casual" />
            </Route>
          </Switch>
        </SolvesContext.Provider>
      </SettingsContext.Provider>
    </Router>
  );
}

export default App;
