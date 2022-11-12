const USerProfilePage = (props) => {
    return <h1>{props.username}</h1>
}

export default USerProfilePage

export async function getServerSideProps(context){

    const {params,req,res} = context

    return{
        props:{
            username:"Max"
        }
    }
}