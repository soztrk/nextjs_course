import { getSession } from "next-auth/client"
import { useRef } from "react"

export default function AdminPage(){

    const inputRef = useRef()

    async function submitHandler(event){
        event.preventDefault()

        const formData = {
            input:inputRef.current.value
        }

        try{
            const response = await fetch("/api/admin/test",{
                method:"PATCH",
                body:JSON.stringify(formData),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            if(!response.ok) throw new Error(response.message)

            const data = await response.json()

            console.log(data)
        }
        catch(error){
            console.log(error.toString())
        }
        
    }

    return (
        <form onSubmit={submitHandler}>
            <h1>Yönetici</h1>
            <div>
                <input ref={inputRef} type="text" />
            </div>
        </form>
    )
}

export async function getServerSideProps(context){
    const session = await getSession({req:context.req})
  
    if(!session){
      return{
        redirect:{
          destination:"/",
          permanent:false
        }
      }
    }
  
    return{props:{session}}
  }