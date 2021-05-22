import React from 'react'

const Card = (props) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Card
