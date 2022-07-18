import {createContext,useState,useEffect} from "react"

const NotificationContext = createContext()
export default NotificationContext

export function NotificationContextProvider(props){
    const [activeNotification,setActiveNotification] = useState()

    function showNotificationHandler(notificationData){
        setActiveNotification(notificationData)
    }
    function hideNotificationHandler(){
        setActiveNotification(null)
    }

    const context = {
        notification:activeNotification,
        showNotification:showNotificationHandler,
        hideNotification:hideNotificationHandler
    }

    useEffect(()=>{
        if(activeNotification && activeNotification.status !== "pending" ){
            const timer = setTimeout(()=>{
                hideNotificationHandler()
            },3000)

            return () => {
                clearTimeout(timer)
            }
        }
    },[activeNotification])

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}