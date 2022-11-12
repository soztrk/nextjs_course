import Link from "next/link"

const NewsPage = () => {
    return (
        <>
            <h1>The News Page</h1>
            <ul>
                <li><Link href="/news/nextjs-is-good">Nextjs is good</Link></li>
                <li><Link href="/">Go Back</Link></li>
            </ul>
        </>
    )
}

export default NewsPage