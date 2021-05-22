import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Casual from './components/Casual';
import Scramble from './components/Scramble'
import {useState} from 'react';

function App() {
  const [eventName, setEvent] = useState('333')

  const changeEvent = (e) => {
    setEvent(e)
  }
  console.log(eventName)
  return (
    <Router>
      <Navbar eventName={eventName} changeEvent={changeEvent}/>
      <Switch>
        <Route path="/casual">
          <Scramble eventName={eventName} />
          <Casual />
        </Route>
        <Route path="/competetive">
          <div className="Competetive">
            
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
