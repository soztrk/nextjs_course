import fs from "fs/promises"
import path from "path"
import Link from "next/link"

export default function HomePage(props) {

  const {products} = props

  return (
      <ul>
        {products.map(product=>(<li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>))}
      </ul>
  );
}

export const getStaticProps = async (context) => {

  const filePath = path.join(process.cwd(),"data","dummyBackend.json")
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  //const data = {products:[]}
  //const data = false

  if(!data) return {redirect:{destination:"/no-data"}}

  if(data.products.length === 0) return {notFound:true}

  return {
    props:{
      products:data.products
    },
    revalidate:10
  }
}