import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { verifyPassword } from "../../../lib/auth"
import { connectDatabase } from "../../../lib/db"

export default NextAuth({
    session:{
        jwt:true
    },
    providers : [
        Providers.Credentials({
            async authorize(credentials){
                const client = await connectDatabase()

                const usersCollection = client.db().collection("users")

                const user = await usersCollection.findOne({email:credentials.email})
                if(!user) {
                    client.close()
                    throw new Error("User not found!")
                }

                const isValid = await verifyPassword(credentials.password,user.password)
                if(!isValid) {
                    client.close()
                    throw new Error("Could not logged in!")
                }

                client.close()
                return {
                    email:user.email
                }
            }
        })
    ]
})