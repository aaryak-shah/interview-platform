import React, { useEffect, useState } from "react"
import { MdWork, MdCalendarToday } from "react-icons/md"
import "./Question.css"
import AceEditor from "react-ace"
import { useSelector } from "react-redux"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/theme-tomorrow_night_bright"
import ReactMarkdown from "react-markdown"
import { executeCode } from "../../requests/code"

import remarkGfm from "remark-gfm"
import formatDate from "../../utils"

import openSocket from "socket.io-client"

const socket = openSocket("http://localhost:9000")

function Question({ questionData, mode = "practice", sessionCode }) {
  const languageList = {
    py: "python",
    cpp: "c_cpp",
    js: "javascript",
  }
  const languageDefaults = {
    py: 'print("Hello Python")',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello C++";\n    return 0;\n}\n',
    js: 'console.log("Hello Javascript");',
  }
  const theme = "tomorrow_night_bright"
  let [qData, setQData] = useState(questionData)
  let [code, setCode] = useState(languageDefaults["py"])
  let [input, setInput] = useState("")
  let [output, setOutput] = useState("")
  let [languageMode, setLanguageMode] = useState("python")
  let [languageExtension, setLanguageExtension] = useState("py")

  let user = useSelector((state) => state.user)

  function changeLanguage(l) {
    setLanguageExtension(l)
    setCode(languageDefaults[l])
  }

  useEffect(() => {
    setQData(questionData)
  }, [questionData])

  //code run on press of SHIFT+F4
  useEffect(() => {
    document.onkeydown = (keyDownEvent) => {
      if (keyDownEvent.shiftKey && keyDownEvent.key === "F4") runCode()
    }
  })

  useEffect(() => {
    if (mode === "live") {
      if (user.role === "interviewer") {
        console.log("hosting")
        socket.emit("hostSession", { sessionCode })
        socket.on("receiveLiveCode", (data) => {
          setCode(data.code)
          setOutput(data.output)
        })
      } else {
        console.log("joining")
        socket.emit("joinSession", { sessionCode })
        socket.on("receiveLiveInput", (data) => {
          setInput(data.input)
        })
      }
      socket.on("receiveNewQuestion", (data) => {
        console.log(data)
        setQData(data)
      })
    }
  }, [mode, sessionCode, user])

  useEffect(() => {
    if (mode === "live") {
      socket.emit("liveCode", { sessionCode, mode, output, code })
      socket.emit("liveInput", { sessionCode, mode, input })
      socket.on("initialLoad", () => {
        socket.emit("liveCode", { sessionCode, mode, input, output, code })
        socket.emit("liveInput", { sessionCode, mode, input })
      })
    }
  }, [mode, code, input, output, sessionCode])

  useEffect(() => {
    if (user.role === "interviewer") {
      socket.on("receiveGainFocusNotification", (data) => {
        console.log("receiveGainFocusNotification")
        // setCheatingNotif(false)
        document
          .querySelector(".session-page")
          .classList.remove("session-page-notif-true")
      })
      socket.on("receiveLoseFocusNotification", (data) => {
        console.log("receiveLoseFocusNotification")
        // setCheatingNotif(true)
        document
          .querySelector(".session-page")
          .classList.add("session-page-notif-true")
      })
    }
  })

  function runCode() {
    executeCode({
      language: languageExtension,
      input,
      code,
      question: qData._id,
    })
      .then((res) => {
        console.log(res)
        if (res.output) setOutput(res.output)
        else if (res.stderr) setOutput(res.stderr)
        else setOutput("")
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {qData ? (
        <div className="question-page">
          <section className="controls">
            <div className="controls-left">
              <h4>Programming Language: </h4>
              <select
                name="language"
                id="language"
                onChange={(e) => changeLanguage(e.target.value)}>
                <option name="language" value="py">
                  Python
                </option>
                <option name="language" value="cpp">
                  C++
                </option>
                <option name="language" value="js">
                  Javascript
                </option>
              </select>
            </div>
            <div className="controls-right">
              <button className="reset-code">Reset</button>
              <button className="run-code" onClick={runCode}>
                Run Code (Shift+F4)
              </button>
            </div>
          </section>
          <section className="question-details">
            <h1>{qData.title}</h1>
            <div className="tag company-tag">
              <span className="icon">
                <MdWork />
              </span>
              <span>{qData.company?.name}</span>
            </div>
            <div className="tag">
              <span className="icon">
                <MdCalendarToday />
              </span>
              <span>{formatDate(new Date(qData.createdAt))}</span>
            </div>
            <div className="">
              {qData.attempts ? qData.attempts : 0} attempts &bull;{" "}
              <span
                className={`difficulty-tag difficulty-${
                  qData.difficulty ? qData.difficulty : "medium"
                }`}>
                {qData.difficulty ? qData.difficulty : "medium"}
              </span>
            </div>
            <div className="question-description">
              <ReactMarkdown
                children={qData.bodyHtml}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </section>
          <section className="editor code-editor">
            <AceEditor
              placeholder="Code"
              mode={languageMode}
              theme={theme}
              height="100%"
              width="2fr"
              value={code}
              fontSize={14}
              showPrintMargin={false}
              onChange={(val) => setCode(val)}
              name="code_editor"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              readOnly={user.role === "interviewer"}
              // highlightActiveLine={joinedSessionCode === "" ? true : false}
              // readOnly={joinedSessionCode === "" ? false : true}
            />
          </section>
          <section className="editor input-editor">
            <AceEditor
              readOnly={user.role === "candidate"}
              showGutter={false}
              placeholder="Input"
              mode="text"
              theme={theme}
              height="100%"
              width="2fr"
              value={input}
              fontSize={14}
              showPrintMargin={false}
              onChange={(val) => setInput(val)}
              name="code_editor"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              // highlightActiveLine={joinedSessionCode === "" ? true : false}
              // readOnly={joinedSessionCode === "" ? false : true}
            />
          </section>
          <section className="editor editor-locked output-editor">
            <AceEditor
              readOnly={true}
              showGutter={false}
              placeholder="Output"
              mode="text"
              theme={theme}
              height="100%"
              width="2fr"
              value={output}
              fontSize={14}
              showPrintMargin={false}
              name="code_editor"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              // highlightActiveLine={joinedSessionCode === "" ? true : false}
              // readOnly={joinedSessionCode === "" ? false : true}
            />
          </section>
        </div>
      ) : null}
    </>
  )
}

export default Question
