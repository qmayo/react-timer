import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="card" style={{ margin: 5 }}>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Card;
