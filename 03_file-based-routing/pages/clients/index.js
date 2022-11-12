import Link from "next/link"

const clients = [
    {id:"max",name:"Maximillian"},
    {id:"manu",name:"Manuel"}
]

const Clients = () => {
    return(
        <div>
            <h1>Clients List</h1>
            <ul>
                {clients.map((value,index)=>{
                    return (
                        <li key={index}><Link href={`/clients/${value.id}`}>{value.name}</Link></li>
                    )
                })}
                {/* <li key={index}><Link href={{pathname:"/clients/[id]",query:{id:value.id}}}>{value.name}</Link></li>  */}
                <li><Link href="/">Go Back</Link></li>
            </ul>
        </div>
    )
}

export default Clients