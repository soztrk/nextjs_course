import {useRef, useState} from "react"

export default function HomePage() {

  const emailInputRef = useRef()
  const feedbackInputRef = useRef()
  const [feedbacks,setFeedbacks] = useState([])

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value

    const postBody = {
      email:enteredEmail,
      text:enteredFeedback
    }

    fetch("/api/feedback",{
      method:"POST",
      body:JSON.stringify(postBody),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(response=>response.json())
    .then(()=>{
      event.target.reset()
    })
    .catch(error=>alert(error))
  }

  const loadFeedbacksHandler = () => {

    fetch("/api/feedback")
    .then(response=>response.json())
    .then(data=>{
      setFeedbacks(data.feedbacks)
    })
    .catch(error=>alert(error))

  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailInputRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackInputRef} id="feedback" rows="5"></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbacksHandler}>Load Feedbacks</button>
      <br />
      <br />
      <table border="1">
        {feedbacks.map((value)=>(
          <tr key={value.key}>
            <td>{value.email}</td>
            <td>{value.text}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}