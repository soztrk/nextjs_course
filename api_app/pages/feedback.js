import fs from "fs"
import path from "path"
import {useState} from "react"

export default function FeedbackPage(props){

    const [detail,setDetail] = useState(null)

    const showDetailsHandler = (id) => {
        fetch(`api/feedback/${id}`)
        .then(response=>response.json())
        .then(data=>{
            setDetail(data.feedback.text)
        })
    }

    return (
        <div>
           <table border="1">
                {props.feedbacks.map((value)=>(
                <tr key={value.id}>
                    <td>{value.email}</td>
                    <td><button onClick={showDetailsHandler.bind(null,value.id)}>Show Details</button></td>
                </tr>
                ))}
                <tr>
                    <td colspan="2">{detail}</td>
                </tr>
            </table> 
        </div>
        
    )
}

export async function getStaticProps(){

    const filePath = path.join(process.cwd(),"data","feedback.json")
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)

    return{
        props:{
            feedbacks:data
        }
    }
}