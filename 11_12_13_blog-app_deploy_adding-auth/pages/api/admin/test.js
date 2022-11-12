import { getSession } from "next-auth/client"

export default async function handler(req,res){
    if(req.method !== "PATCH") return
    
    const session = await getSession({req:req})

    if(!session) return res.status(401).json({message:"Not authenticated!"})

    res.status(200).json({mesage:"Congrats, you sent some data : "+req.body.input})
}