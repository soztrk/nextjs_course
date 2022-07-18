import AllPosts from "../../components/parts/posts/all-posts";
import { getAllPosts } from "../../helpers/posts-util";

export default function PostsPage(props){
    return <AllPosts posts={props.posts} />
}

export function getStaticProps(){

    const allPosts = getAllPosts()

    return{
        props:{
            posts:allPosts
        }
    }
}