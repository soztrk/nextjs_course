import fs from "fs"
import path from "path"

export default function handler(req,res){

    const feedbackId = req.query.id

    const filePath = path.join(process.cwd(),"data","feedback.json")
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    const feedback = data.find(val=>val.id===feedbackId)

    res.status(200).json({message:"Success",feedback:feedback})
}