import {useRef} from "react"
import styles from "./EventSearch.module.css"
import Button from "../../ui/Button/Button"

const EventSearch = (props) => {
    
    const yearInputRef = useRef()
    const monthInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        props.onSearch(yearInputRef.current.value,monthInputRef.current.value)
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.controls}>
                <div className={styles.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearInputRef}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className={styles.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthInputRef}>
                        <option value="1">Ocak</option>
                        <option value="2">Şubat</option>
                        <option value="3">Mart</option>
                        <option value="4">Nisan</option>
                        <option value="5">Mayıs</option>
                        <option value="6">Haziran</option>
                        <option value="7">Temmuz</option>
                        <option value="8">Ağustos</option>
                        <option value="9">Eylül</option>
                        <option value="10">Ekim</option>
                        <option value="11">Kasım</option>
                        <option value="12">Aralık</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    )
}

export default EventSearch