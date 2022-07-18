import {useRouter} from "next/router"
import Head from "next/head"

import NewMeetupForm from "../components/meetups/NewMeetupForm"

const NewMeetupPage = () => {

    const router = useRouter() 

    const addMeetupHandler = async (data) => {
        const response = await fetch("/api/new-meetup",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const responseData = await response.json()

        console.log(responseData)

        router.replace("/")
    }

    return(
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta name="description" content="Add your own meetups for networking" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
        
    )
}
export default NewMeetupPage