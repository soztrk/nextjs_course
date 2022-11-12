import { useState,useEffect,useContext,useRef } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../store/NotificationContext";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [resetForm,setResetForm] = useState(false)
  const [comments,setComments] = useState([])
  const [loadingComments,setLoadingComments] = useState(false)

  const notificationCtx = useContext(NotificationContext)

  const commentsContainerRef = useRef()

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => {
      return !prevStatus
    });
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title:"Sending ...",
      message:"Your comment is pending",
      status:"pending"
    })

    fetch(`/api/comment/${eventId}`,{
      method:"POST",
      body:JSON.stringify(commentData),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((response)=>{
      if(!response.ok) {
        return response.json().then(data=>{
          throw new Error(data.message)
        })
      }
      return response.json()
    })
    .then(data=>{
      setResetForm(true)
      setComments(prevState=>([data.comment,...prevState]))

      notificationCtx.showNotification({
        title:"Success",
        message:"Your comment succesfully sent.",
        status:"success"
      })

    })
    .catch(error=>{
      
      notificationCtx.showNotification({
        title:"Error!",
        message:error.message,
        status:"error"
      })

    })
  }

  function getComments(id){

    setLoadingComments(true)

    /* notificationCtx.showNotification({
      title:"Loading ...",
      message:"Comments loading",
      status:"pending"
    }) */

    fetch(`/api/comment/${id}`)
    .then(response=>{

      setLoadingComments(false)

      if(!response.ok) {
        return response.json().then((data)=>{
          throw new Error(data.message)
        })
      }
      return response.json()
    })
    .then(data=>{
      setComments(data.comments)
      setTimeout(()=>{
      window.scrollTo({top:commentsContainerRef.current.offsetTop+350,behavior:"smooth"})
      },200)

      /* notificationCtx.showNotification({
        title:"Success",
        message:"Comments successfully loaded.",
        status:"success"
      }) */

    })
    .catch(error=>{

      notificationCtx.showNotification({
        title:"Error!",
        message:error.message,
        status:"error"
      })

    })
  }

  useEffect(()=>{
    if(showComments) getComments(eventId)
  },[showComments])

  return (
    <section ref={commentsContainerRef} className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} onResetForm={resetForm} />}
      {showComments && <CommentList items={comments} loading={loadingComments} />}
    </section>
  );
}

export default Comments;
