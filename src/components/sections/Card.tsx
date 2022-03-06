import React from 'react';

const Card = (props: any) => {
  return (
    <div className="card" style={{margin: 5}}>
      <div className="card-content">
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
