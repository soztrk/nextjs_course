import {MongoClient} from "mongodb"

export async function connectDatabase(){
    return await MongoClient.connect("mongodb+srv://root:Root123@cluster0.7b4z5.mongodb.net/events?retryWrites=true&w=majority")
}
  
export async function insertDocument(client,collection,document){
    const db = client.db()
    return await db.collection(collection).insertOne(document)
}

export async function getDocuments(client,collection,find,sort){
    const db = client.db()
    return await db.collection(collection).find(find).sort(sort).toArray()
}