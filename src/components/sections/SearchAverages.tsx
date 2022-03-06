import React from 'react'
import { WCAEvent } from '../../types'

interface SearchAveragesProps {
    eventName: WCAEvent;
}

const SearchAverages = ({ eventName }: SearchAveragesProps) => {
  return (
    <div className="container has-text-left m-6">
          <h5 className="title is-5">Search Averages:</h5>
          <form onClick={(e) => {
            e.preventDefault()
          }}>
            <div className="control">
              <label className="radio">
                <input type="radio" value="average" checked />
                Average
              </label>
              <br />
              <label className="radio">
                <input type="radio" value="mean" />
                Mean
              </label>
            </div>
          </form>
        </div>
  )
}

export default SearchAverages