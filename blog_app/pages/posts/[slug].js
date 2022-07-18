import PostContent from "../../components/parts/posts/post-content";
import { getPostData, getPostsFileNames } from "../../helpers/posts-util";

export default function PostDetailPage(props){
    return <PostContent post={props.post} />
}

export function getStaticProps(context){
    const {slug} = context.params

    const post = getPostData(slug)

    return {
        props:{
            post
        },
        revalidate:600
    }
}

export function getStaticPaths(){

    const paths = getPostsFileNames().map(fileName=>({params:{slug:fileName}}))

    return {
        paths,
        fallback:false
    }
}