import {useRouter} from "next/router"
import { useEffect,useState } from "react";
import { useSession,getSession } from 'next-auth/client';

import AuthForm from '../components/forms/auth-form';


function AuthPage() {
  /* const [isLoading,setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    getSession().then(session=>{
      if(session){
        router.replace("/")
      }else{
        setIsLoading(false)
      }
    })
  },[])

  if(isLoading) return <p className="center">Loading...</p> */
  
  return <AuthForm />
}

export default AuthPage;

export async function getServerSideProps(context){
  const session = await getSession({req:context.req})

  if(session){
    return{
      redirect:{
        destination:"/",
        permanent:false
      }
    }
  }

  return{props:{session}}
}