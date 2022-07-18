import {useEffect,useState} from "react"
import {useRouter} from "next/router"
import { getFilteredEvents } from "../../helpers/apiUtils";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title"
import AlertBox from "../../ui/AlertBox/AlertBox"
import Head from "next/head"

// Client Side Data Fetching
export default function EventFilterPage(){
    const router = useRouter()
    const [loadedEvents,setLoadedEvents] = useState()

    const filterData = router.query.slug
    let filteredYear = null
    let filteredMonth = null
    let filteredEvents = null
    let date = null

    let loading = null
    let error = null

    useEffect(()=>{

            fetch("https://react-http-52c30-default-rtdb.europe-west1.firebasedatabase.app/events.json")
            .then(response=>response.json())
            .then(data=>{

                const events = []
    
                for(const key in data){
                    events.push({
                        id:key,
                        ...data[key]
                    })
                }

                setLoadedEvents(events)

            }) 
            .catch(error=>{
                alert(error)
            })           

    },[filterData])

    if(!loadedEvents) {
        loading = <p className="center">Loading...</p>
    }
    else {

        filteredYear = Number(filterData[0])
        filteredMonth = Number(filterData[1])

        if(
            isNaN(filteredYear) ||
            isNaN(filteredMonth) ||
            filteredYear > 2022 ||
            filteredYear < 2021 ||
            filteredMonth < 1 ||
            filteredMonth > 12
        ){
            error = !error ? <AlertBox>Invalid filter !</AlertBox> : error
        }

        filteredEvents = loadedEvents.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1;
        })

        if(!filteredEvents || filteredEvents.length === 0) error = !error ? <AlertBox>No events found for the chosen filter!</AlertBox> : error
        date = new Date(filteredYear,filteredMonth - 1)
    }

    return (
        <>
            <Head>
                <title>Filtered Events</title>
                <meta name="description" content={`All events for ${filteredMonth}/${filteredYear}`} />
            </Head>
            {!loading && !error ? 
            <>
                <ResultsTitle date={date} />
                <EventList items={filteredEvents} />
            </>
            :
            <>
                {loading}
                {error}
            </>
            }
        </>
        
    )
}

// Server Side Data Fetching
/* export default (props) => {

    if(props.hasError) return <AlertBox>Invalid filter!</AlertBox>

    const filteredEvents = props.events
    const filteredYear = props.date.year
    const filteredMonth = props.date.month

    if(filteredEvents.length === 0) return <AlertBox>No events found!</AlertBox>

    const date = new Date(filteredYear,filteredMonth - 1)

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
        
    )
}

export const getServerSideProps = async (context) => {
    const {params} = context
    const filterData = params.slug
    const filteredYear = Number(filterData[0])
    const filteredMonth = Number(filterData[1])

    if(
        isNaN(filteredYear) ||
        isNaN(filteredMonth) ||
        filteredYear > 2022 ||
        filteredYear < 2021 ||
        filteredMonth < 1 ||
        filteredMonth > 12
    ){
        return {
            props:{hasError:true}
            // notFound:true 
            // redirect:{
            //    destination:"/error"
            //} 
        }
    }

    const filteredEvents = await getFilteredEvents({year:filteredYear,month:filteredMonth})

    return{
        props:{
            events:filteredEvents,
            date:{
                year:filteredYear,
                month:filteredMonth
            }
        }
    }
} */