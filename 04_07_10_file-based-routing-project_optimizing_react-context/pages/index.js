import { getFeaturedEvents } from "../helpers/apiUtils"
import EventList from "../components/events/EventList"
import AlertBox from "../ui/AlertBox/AlertBox"
import NewsletterRegistration from "../forms/newsletter-registration"

export default function HomePage(props){

  if(!props.events) return <AlertBox>No events found!</AlertBox>

  return (
    <>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  
  )
}

export const getStaticProps = async () => {

  const featuredEvents = await getFeaturedEvents()

  return {
    props : {
      events:featuredEvents
    },
    revalidate:3600
  }
}
