import React from 'react'
import Events from './Events'

const Navbar = ({eventName, changeEvent}) => {
    return (
    <div className="navbar has-background-link-dark mb-6">
        <div className="navbar-brand">
          <img src={process.env.PUBLIC_URL + '/logo.png'} height="100" width="100" alt={'React timer logo'}/>
        </div>
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-text-white has-background-link-dark">
              Mode
            </a>
            <div className="navbar-dropdown has-background-link-dark">
              <a href="/casual" className="navbar-item has-text-white has-background-link-dark">
                Casual
              </a>
              <a href="competetive" className="navbar-item has-text-white has-background-link-dark">
                Competetive
              </a>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-text-white has-background-link-dark">
              Event
            </a>
            <div className="navbar-dropdown has-background-link-dark">
              <Events eventName={eventName} changeEvent={changeEvent}/>
            </div>
          </div>
        </div>
        <div className="navbar-end">
            
        </div>
      </div>
    )
}

export default Navbar
