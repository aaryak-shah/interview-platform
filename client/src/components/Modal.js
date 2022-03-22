import React from "react"
import { MdClose } from "react-icons/md"
import "./Modal.css"

function Modal({ ModalContent, modalTitle }) {
  function closeModal() {
    document.querySelector(".modal-overlay").classList.remove("show-modal")
    console.log(
      "closing modal",
      document.querySelector(".modal-overlay").classList
    )
  }
  return (
    <div className="modal-overlay">
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
