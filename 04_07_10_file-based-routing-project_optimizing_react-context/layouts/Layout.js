import { useContext } from "react"
import MainHeader from "./MainHeader"
import Notification from "../ui/Notification/Notification"
import NotificationContext from "../store/NotificationContext"

const Layout = (props) => {

    const notificationCtx = useContext(NotificationContext)
    const activeNotification = notificationCtx.notification

    return(
        <>
            <header>
                <MainHeader />
            </header>
            <main>
                {props.children}
                {activeNotification && <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                />}
            </main>
        </>
    )
}

export default Layout