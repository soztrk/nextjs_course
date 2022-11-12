import {MongoClient} from "mongodb"

export async function connectDatabase(){
    try{
        const mongoUrl = `mongodb+srv://${process.env.mongodb.username}:${process.env.mongodb.password}@${process.env.mongodb.cluster}.mongodb.net/${process.env.mongodb.database}?retryWrites=true&w=majority`

        return await MongoClient.connect(mongoUrl)
    }
    catch(error){
        return res.status(500).json({message:"Could not connect to database"})
    }
}