import styles from "./AlertBox.module.css"

const AlertBox = (props) => {
    return <div className={styles.alertbox}>{props.children}</div>
}

export default AlertBox