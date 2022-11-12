import { hashPassword } from "../../../lib/auth";
import { connectDatabase } from "../../../lib/db";

export default async function handler(req,res){

    if(req.method !== "POST") return

    const {email,password} = req.body

    if(!email || !email.includes("@") || !password || password.trim().length < 7) return res.status(422).json({message:"Invalid input!"})

    const client = await connectDatabase()
    const db = client.db()

    const isUserExisting = await db.collection("users").findOne({email})

    if(isUserExisting) {
        client.close()
        return res.status(422).json({message:"User already exists!"})
    }

    try{
        const result = await db.collection("users").insertOne({email,password:await hashPassword(password)})
        console.log(result.insertedId)

    }
    catch(error){
        client.close()
        res.status(500).json({message:"User cannot created!"})
    }

    client.close()
    res.status(201).json({message:"User created!"})

}