import { MongoClient } from "mongodb"

export default async function handler(req,res){
    if(req.method === "POST"){
        const {email,name,message} = req.body

        if(!email || 
           !email.includes("@") || 
           !name ||
           name.trim() === "" ||
           !message.trim() === ""
        ){
            return res.status(422).json({message:"Invalid input!"})
        }

        //Store in database
        const newMessage = {
            email,
            name,
            message
        }

        let client

        try{
            client = await MongoClient.connect("mongodb+srv://root:Root123@cluster0.7b4z5.mongodb.net/sblog?retryWrites=true&w=majority")
        }
        catch(error){
            return res.status(500).json({message:"Could not connect to database"})
        }

        const db = client.db()

        try{
            const result = await db.collection("messages").insertOne(newMessage)
            newMessage.id = result.insertedId
        }
        catch(error){
            client.close()
            return res.status(500).json({message:"Storing message is failed!"})
        }

        client.close()
        res.status(201).json({message:"Your message successfuly stored!"})
    }
}