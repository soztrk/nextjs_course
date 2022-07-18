import { useState } from "react"
import {useRouter} from "next/router"
import Link from "next/link"

const Clients = () => {
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const router = useRouter()

    const returnHandler = () => {
        setButtonDisabled(true)
        setTimeout(()=>{
            router.push("/clients")
        },2000)
    }

    return(
        <div>
            <h1>User Id = {router.query.id}</h1>
            <button onClick={returnHandler} disabled={buttonDisabled}>{buttonDisabled ? "Loading ..." : "Go Back"}</button>
        </div>
    )
}

export default Clients