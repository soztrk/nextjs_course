import {useContext, useRef} from "react"
import classes from './newsletter-registration.module.css';
import NotificationContext from "../store/NotificationContext";

function NewsletterRegistration() {
  const emailInputRef = useRef()
  const notificationCtx = useContext(NotificationContext)

  async function registrationHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value

    notificationCtx.showNotification({
      title:"Signing up...",
      message:"Registering for newsletter!",
      status:"pending"
    })

    try{
      const response = await fetch("/api/newsletter",{
        method:"POST",
        body:JSON.stringify({email}),
        headers:{
          "Content-Type":"application/json"
        }
      })

      if(response.ok) {
        event.target.reset()
        notificationCtx.showNotification({
          title:"Success",
          message:"Successfully registered for newsletter!",
          status:"success"
        })
      }else{
        const data = await response.json()
        throw new Error(data.message)
      }
    } catch (error){
      notificationCtx.showNotification({
        title:"Error!",
        message:error.message,
        status:"error"
      })
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            required
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
