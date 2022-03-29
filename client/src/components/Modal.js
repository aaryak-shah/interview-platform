import React from "react"
import { MdClose } from "react-icons/md"
import "./Modal.css"

function Modal({ ModalContent, modalTitle, purpose = "session" }) {
  function closeModal() {
    document
      .querySelectorAll(".modal-overlay")
      .forEach((e) => e.classList.remove("show-modal"))
  }
  return (
    <div className={`modal-overlay modal-purpose-${purpose}`}>
      <div className="modal-box">
        <div className="modal-header">
          <h3>{modalTitle}</h3>
          <div className="close-icon" onClick={closeModal}>
            <MdClose />
          </div>
        </div>
        {ModalContent}
      </div>
    </div>
  )
}

export default Modal
