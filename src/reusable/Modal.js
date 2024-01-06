import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, header, open, type, onClose }) => {
  let className = open ? "mdl" : "mdl u-display-none";
  if (type === "small") className += " mdl-sm";
  return createPortal(
    <div className={className}>
      <div className="mdl__content">
        <div className="mdl__header">
          <span className="mdl__close" onClick={onClose}>
            &times;
          </span>
          <h3 className="heading-tertiary">{header}</h3>
        </div>

        <div className="mdl__body">{children}</div>
      </div>
    </div>,
    document.querySelector("#modal-root")
  );
};

export default Modal;
