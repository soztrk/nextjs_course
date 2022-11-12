import {useRouter} from "next/router"

const DetailPage = () => {

    const router = useRouter()
    router.query.newsId

    return <h1>The Detail Page of News : {router.query.newsId}</h1>
}

export default DetailPage