import Head from "next/head"

import Hero from "../components/ui/hero"
import FeaturedPosts from "../components/parts/posts/featured-posts"
import { getFeaturedPosts } from "../helpers/posts-util"

export default function HomePage(props){

    return(
        <>
            <Head>
                <title>SloBLOG is at your service.</title>
                <meta name="description" content="I post about anything I want." />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts}/>
        </>
    )
}

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts()

    return {
        props:{
            posts:featuredPosts
        }
    }
}

