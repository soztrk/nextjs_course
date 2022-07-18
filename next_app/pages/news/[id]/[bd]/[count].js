import {useRouter} from "next/router"
import Link from "next/link"

const CounterPage = () => {

    const router = useRouter()

    return (
        <>
            <h1>CounterPage </h1>
            <ul>
                <li>query = {router.query.id + router.query.bd + router.query.count}</li>
                <li>pathname = {router.pathname}</li>
                <li><Link href="/">Go Back</Link></li>
            </ul> 
        </>
        
    )
}

export default CounterPage