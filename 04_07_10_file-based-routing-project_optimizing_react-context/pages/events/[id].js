import Head from "next/head"

import { getEventById,getFeaturedEvents } from "../../helpers/apiUtils"
import EventSummary from "../../components/event-detail/event-summary"
import EventLogistics from "../../components/event-detail/event-logistics"
import EventContent from "../../components/event-detail/event-content"
import Comments from "../../forms/comments"


export default function EventDetailPage(props){

    const event =  props.event

    if(!event) return <p>Loading...</p>

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date} 
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </>
    )
}

export const getStaticProps = async (context) => {
    const eventId = context.params.id
    const eventById = await getEventById(eventId) || null

    if(eventById === null) return {notFound:true}

    return{
        props:{
            event:eventById
        },
        revalidate:60
    }
}

export const getStaticPaths = async (context) => {

    const featuredEvents = await getFeaturedEvents()
    const eventPaths = []

    for(const event of featuredEvents){
        eventPaths.push({params:{id:event.id}})
    }

    return{
        paths:eventPaths,
        fallback:true
    }
}