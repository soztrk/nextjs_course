import Link from "next/link"

const HomePage = () => {
    return (
        <>
            <h1>The Home Page</h1>
            <ul>
                <li><Link href="/news">News root</Link></li>
                <li><Link href="/news/nextjs-is-good/b-good/12">News / id / bd / count</Link></li>
                <li><Link href="/blog/date-11/id-1/price-12">Blog Slug</Link></li>
                <li><Link href="/clients">Clients</Link></li>
            </ul>
        </>
        
    )
}

export default HomePage