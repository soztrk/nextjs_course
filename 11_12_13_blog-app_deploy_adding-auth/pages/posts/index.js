import Head from "next/head"

import AllPosts from "../../components/parts/posts/all-posts";
import { getAllPosts } from "../../helpers/posts-util";

export default function PostsPage(props){
    return (
        <>  
            <Head>
                <title>All my posts</title>
                <meta name="description" content="A list of all programming stuff and things" />
            </Head>
            <AllPosts posts={props.posts} />
        </>
    )
    
    
}

export function getStaticProps(){

    const allPosts = getAllPosts()

    return{
        props:{
            posts:allPosts
        }
    }
}