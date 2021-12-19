import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Casual from './components/Casual';
import Scramble from './components/scrambles/Scramble'
import {useState} from 'react';

function App() {
  const [eventName, setEvent] = useState('333')

  return (
    <Router>
      <Navbar eventName={eventName} changeEvent={setEvent}/>
      <Switch>
        <Route path="/casual">
          <div className="container has-text-centered">
          <Scramble eventName={eventName} />
          </div>
          <Casual eventName={eventName}/>
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
