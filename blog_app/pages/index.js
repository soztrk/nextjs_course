import Hero from "../components/ui/hero"
import FeaturedPosts from "../components/parts/posts/featured-posts"
import { getFeaturedPosts } from "../helpers/posts-util"

export default function HomePage(props){

    return(
        <>
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

