import fs from "fs/promises"
import path from "path"

const ProductDetailPage = (props) => {
    
    const {loadedProduct} = props

    if(!loadedProduct){
        return <p>Loading...</p>
    }

    return(
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    )
}
export default ProductDetailPage

const getData = async () => {
    const filePath = path.join(process.cwd(),"data","dummyBackend.json")
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)
    return data
}

export const getStaticProps = async (context) => {
    const {params} = context
    const productId = params.pid

    const data = await getData();

    const product = data.products.find((val=>(val.id === productId)))

    if(!product) return {notFound:true}

    return{
        props:{
            loadedProduct:product
        }
    }

}

export const getStaticPaths = async () => {

    const data = await getData();

    // const ids = data.products.map(product=>({params:{pid:product.id}}))

    let ids = []
    data.products.forEach((product,index) => {
        if(index < 2)  ids.push({params:{pid:product.id}})
        else return
    });

    return{
        paths:ids,
        fallback:true
    }
}