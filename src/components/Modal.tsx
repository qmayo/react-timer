import React from 'react';

const Modal = (props: any) => {
  //TODO
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">{props.children}</div>
      <button className="modal-close-is-medium"></button>
    </div>
  );
};

export default Modal;
