import React from "react"
import ReactMarkdown from "react-markdown"
import { useState } from "react"
import "./NewQuestionForm.css"
import { createNewQuestion } from "../requests/question"
import remarkGfm from "remark-gfm"

const mdSample = `Markdown Example:

# Description

Sort the given array of numbers in a non-decreasing order.

### Sample Input

\`\`\`
[2, 1, 3, 5, 4]
\`\`\`

### Sample Output

\`\`\`
1 2 3 4 5
\`\`\`
**Explanation:**
The given numbers are sorted to be in ascending order.

### Constraints
- 1 < N < 10^5
- 1 < A[i] < 10^5
`

function NewQuestionForm() {
  let [title, setTitle] = useState("")
  let [bodyHtml, setBodyHtml] = useState("")
  let [publicQuestion, setPublicQuestion] = useState(false)
  let [difficulty, setDifficulty] = useState("easy")

  function submit(e) {
    e.preventDefault()
    createNewQuestion({
      title,
      bodyHtml,
      difficulty,
      public: publicQuestion,
    })
      .then((res) => {
        console.log(res)
        alert("Question was added succesfully")
        setTitle("")
        setBodyHtml("")
        setPublicQuestion(false)
        setDifficulty("easy")
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="new-question-area">
      <form className="new-question-form" action="#" onSubmit={submit}>
        <label htmlFor="title">Question Title</label>
        <input
          required={true}
          type="text"
          name="title"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="bodyHtml">Description (Use Markdown)</label>
        <textarea
          required={true}
          name=""
          id=""
          rows={15}
          placeholder={mdSample}
          value={bodyHtml}
          onChange={(e) => setBodyHtml(e.target.value)}
        />
        <label htmlFor="public">
          Do you want this question to be publically viewable?
        </label>
        <em>
          NOTE: Public questions can be used for practice by users on the
          platform. Private questions will be limited to live interviews for
          your company.
        </em>
        <div className="option-select-input">
          <input
            type="checkbox"
            name="public"
            id="public"
            checked={publicQuestion === true}
            onChange={(e) => {
              setPublicQuestion(e.target.checked)
            }}
          />
          <label htmlFor="public">Make this question public.</label>
        </div>
        <label htmlFor="difficulty">
          Choose a difficulty level for your question
        </label>
        <div
          className=""
          radioGroup="question-difficulty"
          onChange={(e) => {
            console.log(e.target.value)
            setDifficulty(e.target.value)
          }}>
          <div className="option-select-input">
            <input
              type="radio"
              id="easy"
              name="question-difficulty"
              radioGroup="question-difficulty"
              defaultChecked={difficulty === "easy"}
              value="easy"
            />
            <label htmlFor="easy">Easy</label>
          </div>
          <div className="option-select-input">
            <input
              type="radio"
              id="medium"
              name="question-difficulty"
              radioGroup="question-difficulty"
              value="medium"
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className="option-select-input">
            <input
              type="radio"
              id="hard"
              name="question-difficulty"
              radioGroup="question-difficulty"
              value="hard"
            />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <button className="submit">Create Question</button>
      </form>
      <section className="question-preview">
        <h1>[PREVIEW] {title}</h1>
        <div className="bodyHtml">
          <ReactMarkdown children={bodyHtml} remarkPlugins={[remarkGfm]} />
        </div>
      </section>
    </div>
  )
}

export default NewQuestionForm
