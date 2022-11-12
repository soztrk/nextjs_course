import ReactMarkdown from "react-markdown"
import Image from "next/image"
import {PrismLight  as SyntaxHighlighter} from "react-syntax-highlighter"
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark"
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from "./post-content.module.css"
import PostHeader from "./post-header"

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);

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
          },
          code(code){

            const {className,children} = code

            return <SyntaxHighlighter style={a11yDark} language={"javascript"} children={children} />
          }
    }

    return (
        <article className={classes.content}>
            <PostHeader image={`/images/posts/${slug}/${image}`} title={title} />
            <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
        </article>
    )
}