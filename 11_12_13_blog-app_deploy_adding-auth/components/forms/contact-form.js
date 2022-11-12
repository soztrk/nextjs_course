import { useEffect, useState } from "react"
import classes from "./contact-form.module.css"
import Notification from "../ui/notification"

export default function ContactForm(){

    const defaultValues = {
        email:"",
        name:"",
        message:""
    }

    const [formInputs,setFormInputs] = useState(defaultValues)
    const [requestStatus,setRequestStatus] = useState()
    const [errorMessage,setErrorMessage] = useState(null)

    function sendMessageHandler(event){
        event.preventDefault()

        setRequestStatus("pending")

        fetch("/api/contact",{
            method:"POST",
            body:JSON.stringify(formInputs),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response=>{
            if(!response.ok) {
                return response.json().then(data=>{
                    throw new Error(data.message)
                })
            }
            return response.json()
        })
        .then(data=>{
            setRequestStatus("success")
            setFormInputs(defaultValues)
        })
        .catch(error=>{
            setRequestStatus("error")
            setErrorMessage(error.toString())
        })
    }

    useEffect(()=>{
        if(requestStatus !== "pending"){
            const timer = setTimeout(()=>{
                setRequestStatus(null)
                setErrorMessage(null)
            },3000)

            return ()=>clearTimeout(timer)
        }
    },[requestStatus])

    let notification

    if(requestStatus === "pending"){
        notification = {
            status:"pending",
            title:"Sending message...",
            message:"Yor message is on the way."
        }
    }
    else if(requestStatus === "success"){
        notification = {
            status:"success",
            title:"Success",
            message:"Message sent successfully."
        }
    }
    else if(requestStatus === "error"){
        notification = {
            status:"error",
            title:"Error!",
            message:errorMessage
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form onSubmit={sendMessageHandler} className={classes.form} noValidate>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            value={formInputs.email} 
                            onChange={(event)=>{setFormInputs(prevState=>({...prevState,email:event.target.value}))}} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            required 
                            value={formInputs.name} 
                            onChange={(event)=>{setFormInputs(prevState=>({...prevState,name:event.target.value}))}}  />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message"></label>
                    <textarea 
                        id="message" 
                        rows="5" 
                        required 
                        value={formInputs.message}
                        onChange={(event)=>{setFormInputs(prevState=>({...prevState,message:event.target.value}))}} />
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </section>
    )
}