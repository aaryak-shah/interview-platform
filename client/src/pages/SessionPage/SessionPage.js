import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./SessionPage.css"
import VC from "../VC/VC"
import { MdAssignment, MdCode, MdVideocam, MdShare } from "react-icons/md"
import Question from "../Question/Question"
import AssignQuestionModal from "../../components/AssignQuestionModal/AssignQuestionModal"
import openSocket from "socket.io-client"

const socket = openSocket("http://localhost:9000")

function SessionPage({ sid, questionData = {} }) {
  const user = useSelector((state) => state.user)
  let [viewMode, setViewMode] = useState("vc")

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

  const onFocus = () => {
    handleActivity(true)
  }
  const onBlur = () => {
    handleActivity(false)
  }

  const handleActivity = (forcedFlag) => {
    if (document.activeElement == document.getElementsByTagName("iframe")[0]) {
      console.log("in iframe")
      socket.emit("candidateGainFocus", { sessionCode: sid })
    } else if (typeof forcedFlag === "boolean") {
      console.log("active? ", forcedFlag)
      forcedFlag
        ? socket.emit("candidateGainFocus", { sessionCode: sid })
        : socket.emit("candidateLoseFocus", { sessionCode: sid })
    } else {
      console.log("hidden? ", document.hidden)
      document.hidden
        ? socket.emit("candidateLoseFocus", { sessionCode: sid })
        : socket.emit("candidateGainFocus", { sessionCode: sid })
    }
  }
  // TODO: Attempt this with react-page-visibility library instead
  useEffect(() => {
    if (user.role === "candidate") {
      document.addEventListener("visibilitychange", handleActivity)
      document.addEventListener("blur", onBlur)
      window.addEventListener("blur", onBlur)
      window.addEventListener("focus", onFocus)
      document.addEventListener("focus", onFocus)
      document
        .querySelector("#jitsi")
        ?.children[0]?.addEventListener("focus", onFocus)

      return () => {
        document.removeEventListener("visibilitychange", handleActivity)
        // window.removeEventListener("focus", onFocus)
        // window.removeEventListener("blur", onBlur)
        document.removeEventListener("focus", onFocus)
        document.removeEventListener("blur", onBlur)
      }
    }
  }, [user])

  function launchAssignmentModal() {
    document.querySelector(".modal-purpose-assign").classList.add("show-modal")
  }

  return (
    <div className="session-page">
      {user.role === "interviewer" ? (
        <div className="cheating-notif">
          Notice: The candidate is not focused on their interview window
        </div>
      ) : null}
      <AssignQuestionModal sessionCode={sid} />
      <div className="control-panel">
        {user.role === "interviewer" ? (
          <button
            className="assign-question"
            title="Assign A Question"
            onClick={launchAssignmentModal}>
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
      <div className={`question-container question-container-${viewMode}`}>
        <Question questionData={questionData} mode="live" sessionCode={sid} />
      </div>
      <VC sid={sid} />
    </div>
  )
}

export default SessionPage
