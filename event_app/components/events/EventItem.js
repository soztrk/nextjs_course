import Image from "next/image"

import styles from "./EventItem.module.css"
import Button from "../../ui/Button/Button"

import DateIcon from "../../ui/Icons/date-icon"
import AddressIcon from "../../ui/Icons/address-icon"
import ArrowRightIcon from "../../ui/Icons/arrow-right-icon"

const EventItem = (props) => {

    const {title,image,date,location,id} = props

    const humanReadableDate = new Date(date).toLocaleDateString("tr-TR",{
        day:"numeric",
        month:"long",
        year:"numeric"
    })

    const formattedAddress = location.replace(', ','\n')

    const exploreLink = `/events/${id}`

    return (
       <li className={styles.item}>
            <Image src={"/"+image} alt={title} width={250} height={160} />
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <DateIcon></DateIcon>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon></AddressIcon>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={styles.icon}>
                            <ArrowRightIcon></ArrowRightIcon>
                        </span>
                    </Button>
                </div>
            </div>
       </li> 
    )
}

export default EventItem