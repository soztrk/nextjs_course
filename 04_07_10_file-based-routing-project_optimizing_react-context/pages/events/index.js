import {useRouter} from "next/router"
import { getAllEvents } from "../../helpers/apiUtils"
import EventList from "../../components/events/EventList"
import EventSearch from "../../components/event-detail/EventSearch"
import AlertBox from "../../ui/AlertBox/AlertBox"

export default function EventsPage(props){

    const router = useRouter()
    const events = props.events

    const findEventHandler = (year,month) => {
        router.push(`/events/${year}/${month}`) 
    }

    if(!events) return <AlertBox>No events found!</AlertBox>

    return(
        <>
            <EventSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </>
        
    )
}

export const getStaticProps = async () => {
    const allEvents = await getAllEvents() || null

    return{
        props:{
            events:allEvents
        },
        revalidate:60
    }
}