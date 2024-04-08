import "./Modal.css";
import React from "react";

function Modal({ resultado, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{resultado}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
