import EventItem from "./EventItem"
import styles from "./EventList.module.css"

const EventList = (props) => {
    return (
        <ul className={styles.list}>
            {props.items.map((item,index)=>(
            <EventItem
                key={index}
                id={item.id}
                title={item.title}
                location={item.location}
                date={item.date}
                image={item.image}  
            />))}
        </ul>
    )
}

export default EventList