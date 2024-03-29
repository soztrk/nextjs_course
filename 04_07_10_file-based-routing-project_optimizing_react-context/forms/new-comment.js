import { useRef, useState, useEffect, useContext } from 'react';
import classes from './new-comment.module.css';
import Validate from "../helpers/inputValidator"

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const formRef = useRef()
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;
    /*
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    )
    */

    if(!Validate.email(enteredEmail) || !Validate.required(enteredName) || !Validate.required(enteredComment))
    {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

  }

  useEffect(()=>{
    if(props.onResetForm){
      formRef.current.reset()
    }
  },[props.onResetForm])

  return (
    <form ref={formRef} onSubmit={sendCommentHandler} className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p style={{color:"red"}}>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
