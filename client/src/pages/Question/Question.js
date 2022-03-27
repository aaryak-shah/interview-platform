import React, { useEffect, useState } from "react"
import { MdWork, MdCalendarToday } from "react-icons/md"
import "./Question.css"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/theme-ambiance"
import "ace-builds/src-noconflict/theme-chaos"
import "ace-builds/src-noconflict/theme-chrome"
import "ace-builds/src-noconflict/theme-clouds"
import "ace-builds/src-noconflict/theme-clouds_midnight"
import "ace-builds/src-noconflict/theme-cobalt"
import "ace-builds/src-noconflict/theme-crimson_editor"
import "ace-builds/src-noconflict/theme-dawn"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/theme-eclipse"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-gob"
import "ace-builds/src-noconflict/theme-mono_industrial"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-terminal"
import "ace-builds/src-noconflict/theme-textmate"
import "ace-builds/src-noconflict/theme-tomorrow"
import "ace-builds/src-noconflict/theme-tomorrow_night"
import "ace-builds/src-noconflict/theme-tomorrow_night_bright"
import "ace-builds/src-noconflict/theme-tomorrow_night_blue"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/theme-xcode"
import ReactMarkdown from "react-markdown"
import { executeCode } from "../../requests/code"

import remarkGfm from "remark-gfm"
import formatDate from "../../utils"

function Question({ questionData }) {
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
  let [questionBody, setQuestionBody] = useState("")
  let [code, setCode] = useState(languageDefaults["py"])
  let [input, setInput] = useState("")
  let [output, setOutput] = useState("")
  let [languageMode, setLanguageMode] = useState("python")
  let [languageExtension, setLanguageExtension] = useState("py")

  function changeLanguage(l) {
    setLanguageExtension(l)
    setCode(languageDefaults[l])
  }

  //code run on press of SHIFT+F4
  useEffect(() => {
    document.onkeydown = (keyDownEvent) => {
      if (keyDownEvent.shiftKey && keyDownEvent.key === "F4") runCode()
    }
  })

  function runCode() {
    executeCode({
      language: languageExtension,
      input,
      code,
      question: questionData._id,
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
      {questionData ? (
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
            <h1>{questionData.title}</h1>
            <div className="tag company-tag">
              <span className="icon">
                <MdWork />
              </span>
              <span>{questionData.company?.name}</span>
            </div>
            <div className="tag">
              <span className="icon">
                <MdCalendarToday />
              </span>
              <span>{formatDate(new Date(questionData.createdAt))}</span>
            </div>
            <div className="">
              {console.log(questionData)}
              {questionData.attempts ? questionData.attempts : 0} attempts
              &bull;{" "}
              <span
                className={`difficulty-tag difficulty-${
                  questionData.difficulty ? questionData.difficulty : "medium"
                }`}>
                {questionData.difficulty ? questionData.difficulty : "medium"}
              </span>
            </div>
            <div className="question-description">
              <ReactMarkdown
                children={questionData.bodyHtml}
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
              // highlightActiveLine={joinedSessionCode === "" ? true : false}
              // readOnly={joinedSessionCode === "" ? false : true}
            />
          </section>
          <section className="editor input-editor">
            <AceEditor
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
