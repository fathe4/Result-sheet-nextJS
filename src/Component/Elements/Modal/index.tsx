import React, { ReactNode } from "react";
interface Modal {
  modalId: string;
  children: ReactNode;
  width: string;
}

const Modal = (props: Modal) => {
  const { children, modalId, width } = props;

  return (
    <div className="">
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className={`modal-box relative py-12 ${width}`}>
          <label
            htmlFor={modalId}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
