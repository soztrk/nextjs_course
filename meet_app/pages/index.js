import {MongoClient} from "mongodb"
import Head from "next/head"

import MeetupList from "../components/meetups/MeetupList"


const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse all the react meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
        
    )
}

export const getStaticProps = async () => {

    const client = await MongoClient.connect('mongodb+srv://root:Root123@cluster0.7b4z5.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection("meetups")

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props:{
            meetups: meetups.map(val=>({
                id:val._id.toString(),
                title:val.title,
                address:val.address,
                image:val.image
            }))
        },
        revalidate:1
    }
}


/*
export const getServerSideProps = async (context) => {

    const req = context.req
    const res = context.res

    return{
        props:{
            meetups:DUMMY_MEETS
        }
    }
}
*/

export default HomePage