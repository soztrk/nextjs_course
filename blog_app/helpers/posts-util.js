import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(),"posts")

export function getPostData(postIdentifier){
    const postSlug = postIdentifier.replace(/\.md$/,"")
    const filePath = path.join(postsDirectory,`${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath,"utf-8")
    const {data,content} = matter(fileContent)

    const postData = {
        slug:postSlug,
        ...data,
        content
    }

    return postData
}

export function getAllPosts(){
    const postFiles = fs.readdirSync(postsDirectory)

    const allPosts = postFiles.map(postFile=>{
        return getPostData(postFile)
    })

    allPosts.sort((postA,postB)=>postA.date > postB.date ? -1 : 1)

    return allPosts
}

export function getFeaturedPosts(){
    const allPosts = getAllPosts()

    const featuredPosts = allPosts.filter(post=>post.isFeatured)
    return featuredPosts
}

export function getPostsFileNames(){
    const postFiles = fs.readdirSync(postsDirectory)

    const slugs = postFiles.map(fileName=>fileName.replace(/\.md$/,""))
    return slugs
}