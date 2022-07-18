import { connectDatabase,getDocuments, insertDocument } from "../../../helpers/dbUtils"
import Validate from "../../../helpers/inputValidator"

export default async function handler(req, res) {

      const eventId = req.query.id
      
      let client
      
      try{
        client = await connectDatabase()
      }catch(error){
        return res.status(500).json({message:"Connection to the database failed!"})
      }

      if(req.method === "POST"){
 
        const {email,name,text} = req.body

        if(!Validate.email(email) || 
        !Validate.required(name) || 
        !Validate.required(text)) return res.status(422).json({message:"Invalid input data!"})
        // save data
        
        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result
        try{
            result = await insertDocument(client,"comments",newComment)
            newComment._id = result.insertedId
        }catch(error){
            client.close()
            return res.status(500).json({message:"Inserting data failed!"})
        }
        res.status(201).json({message:"Comment added.",comment:newComment})
      }

      if(req.method === "GET"){

        let documents
        try{
            documents = await getDocuments(client,"comments",{eventId},{_id:-1})
        }catch(error){
            client.close()
            return res.status(500).json({message:"Comments cannot get!"})
        }

        res.status(200).json({message:"Success",comments:documents})
      }

      client.close()
      
  }