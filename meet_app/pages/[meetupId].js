import {MongoClient,ObjectId} from "mongodb"
import Head from "next/head"

import MeetupDetail from "../components/meetups/MeetupDetail"

const MeetupDetailPage = (props) => {
    return(
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail 
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
            image={props.meetupData.image}
            />
        </>
        
    )
}

export const getStaticPaths  = async () => {

    const client = await MongoClient.connect('mongodb+srv://root:Root123@cluster0.7b4z5.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection("meetups")

    const meetups = await meetupsCollection.find({},{_id:1}).limit(1).toArray()

    client.close()

    return {
        fallback:'blocking',
        paths:meetups.map(val=>({params:{meetupId:val._id.toString()}}))
    }
}

export const getStaticProps = async (context) => {

    const client = await MongoClient.connect('mongodb+srv://root:Root123@cluster0.7b4z5.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection("meetups")

    const meetupId = context.params.meetupId
    const meetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)})

    client.close()


    return {
        props:{
            meetupData: {
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                description:meetup.description
            }
        },
        revalidate:10
    }
}

export default MeetupDetailPage