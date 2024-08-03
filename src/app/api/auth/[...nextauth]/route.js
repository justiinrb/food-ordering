// Este código configura la autenticación de Next.js utilizando el proveedor de credenciales. 
//La función authorize es el punto clave donde se implementaría la lógica de autenticación real, 
//verificando las credenciales proporcionadas y devolviendo los datos del usuario autenticado.
import bcrypt from 'bcrypt';
import { User } from "../../../models/user";
import clientPromise from "../../../../libs/mongoConnect";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";


export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
          async authorize(credentials, req) {
            console.log("credentials:",credentials)
            const email = credentials?.email;
            const password = credentials?.password;
    
            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({email});
            console.log(user)
            const passwordOk = user && bcrypt.compareSync(password,user.password);
            console.log("password: ",passwordOk)
            if (passwordOk) {
              return user;
            }
    
            return null
          }
        })
      ]
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }