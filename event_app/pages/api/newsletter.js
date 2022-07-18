import Validate from "../../helpers/inputValidator"
import { connectDatabase,insertDocument } from "../../helpers/dbUtils"

export default async function handler(req, res) {
  if(req.method === "POST"){
    // save data
    const email = req.body.email
    

    if(!Validate.email(email)) return res.status(422).json({message:"Invalid email address"})

      let client

      try{
        client = await connectDatabase()
      }
      catch(error){
        return res.status(500).json({message:"Connection to the database failed!"})
      }

      try{
        await insertDocument(client,"newsletter",{email})
      }
      catch(error){
        return res.status(500).json({message:"Inserting data failed!"})
      }

      client.close()
      res.status(201).json({message:"Signed In!"})
  }
}
