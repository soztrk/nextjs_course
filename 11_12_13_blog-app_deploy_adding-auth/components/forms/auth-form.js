import {useRouter} from "next/router"
import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import {signIn} from "next-auth/client"

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function submitHandler(event){
    event.preventDefault()

    if(!isLogin){
        fetch("/api/auth/signup",{
            method:"POST",
            body:JSON.stringify({
                email:emailInputRef.current.value,
                password:passwordInputRef.current.value
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response=>{
            if(!response.ok){
                return response.json().then(data=>{
                    throw new Error(data.message.toString())
                })
            }
            return response.json()
        })
        .then(data=>{
            alert(data.message)
            event.target.reset()
        })
        .catch(error=>{
            alert(error.toString())
        })
    }
    else{
      signIn("credentials",{
        redirect:false,
        email:emailInputRef.current.value,
        password:passwordInputRef.current.value
      }).then(result=>{
        if(result.error){
          alert(result.error)
        }
        else{
          router.replace("/admin")
        }
      })

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;