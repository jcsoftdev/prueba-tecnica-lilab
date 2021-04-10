import React, { useEffect, useRef } from "react";
import reactDom from "react-dom";

import './Modal.css'

const Modal = ({ children, className, onCloseClick, headerText }) => {

  const ref = useRef(document.getElementById('modal'))
  useEffect(() => {
    ref.current.className = 'isOpen'
    return () => {
      // eslint-disable-next-line
      ref.current.className = ''
    }
  }, [])
  return reactDom.createPortal(
    <div className='modal-container'>
      <div className={`${className} modal`}>
        <div className="modal-header">
          <i onClick={onCloseClick}>X</i>
          <p>{headerText}</p>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    ref.current
  );
};

export default Modal;
