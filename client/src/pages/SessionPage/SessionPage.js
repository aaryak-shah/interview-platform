import React, { useState } from "react"
import { useSelector } from "react-redux"
import "./SessionPage.css"
import VC from "../VC/VC"
import { MdAssignment, MdCode, MdVideocam, MdShare } from "react-icons/md"
import Question from "../Question/Question"

function SessionPage({ sid }) {
  const user = useSelector((state) => state.user)
  const [viewMode, setViewMode] = useState("vc")

  function toggleLayout() {
    if (viewMode === "vc") {
      setViewMode("code")
      document
        .querySelector(".jitsi-container")
        .classList.add("jitsi-container-min")
      document
        .querySelector(".control-panel")
        .classList.add("control-panel-min")
    } else {
      setViewMode("vc")
      document
        .querySelector(".jitsi-container")
        .classList.remove("jitsi-container-min")
      document
        .querySelector(".control-panel")
        .classList.remove("control-panel-min")
    }
  }

  return (
    <div>
      <div className="control-panel">
        {user.role === "interviewer" ? (
          <button className="assign-question" title="Assign A Question">
            <MdAssignment />
          </button>
        ) : null}
        <button
          className="switch-layout"
          onClick={toggleLayout}
          title={viewMode === "vc" ? "Switch To Code" : "Switch To Conference"}>
          {viewMode === "vc" ? <MdCode /> : <MdVideocam />}
        </button>
        <button className="share-code" title="Share Session Code">
          <MdShare />
        </button>
      </div>
      {viewMode === "code" ? <Question questionData={{}} /> : null}
      <VC sid={sid} />
    </div>
  )
}

export default SessionPage
