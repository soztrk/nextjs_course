import ReactMarkdown from "react-markdown"
import Image from "next/image"

import classes from "./post-content.module.css"
import PostHeader from "./post-header"

export default function PostContent(props){

    const {slug,image,title,content} = props.post

    const customRenderers = {
        /* img(image){
            return (
                <Image src={`/images/posts/${slug}/${image.src}`} 
                alt={image.alt} 
                width={600} 
                height={300} />
            )
        }, */
        p(paragraph) {
            const { node } = paragraph;
      
            if (node.children[0].tagName === 'img') {
              const image = node.children[0];
      
              return (
                <div>
                  <Image
                    src={`/images/posts/${slug}/${image.properties.src}`}
                    alt={image.alt}
                    width={600}
                    height={300}
                  />
                </div>
              );
            }
      
            return <p>{paragraph.children}</p>;
          }
    }

    return (
        <article className={classes.content}>
            <PostHeader image={`/images/posts/${slug}/${image}`} title={title} />
            <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
        </article>
    )
}