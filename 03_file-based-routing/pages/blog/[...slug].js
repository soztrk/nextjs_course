import { useRouter } from "next/router"
import Link from "next/link"

const BlogPage = () => {
    const router = useRouter();

    console.log(router.query.slug)

    return (
        <>
            <h1>The Blog</h1>
            <ul>
                <li>{router.query.slug}</li>
                <li><Link href="/">Go Back</Link></li>
            </ul>
        </>
    )
}

export default BlogPage