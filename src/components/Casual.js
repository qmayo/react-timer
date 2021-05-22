import React from 'react'
import Timer from './Timer'
import Card from './Card'

const Casual = () => {
    return (
        <div className="columns is-vcentered">
            <div className="column has-text-centered">
                <Timer />
                <div className="is-flex is-flex-direction-row is-flex-wrap-nowrap is-justify-content-space-around">
                <Card>
                    <h4 className="title is-4">Ao5:</h4>
                    <p>Current: 0</p>
                    <p>Best: 0</p>
                    <p>Worst: 0</p>
                </Card>
                <Card>
                    <h4 className="title is-4">Ao12:</h4>
                    <p>Current: 0</p>
                    <p>Best: 0</p>
                    <p>Worst: 0</p>
                </Card>
                <Card>
                    <h4 className="title is-4">Ao100:</h4>
                    <p>Current: 0</p>
                    <p>Best: 0</p>
                    <p>Worst: 0</p>
                </Card>   
                </div> 
            </div>
        </div>
    )
}

export default Casual
