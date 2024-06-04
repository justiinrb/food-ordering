import bcrypt from 'bcrypt';
import { User } from "../../../models/user";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: process.env.SECRET,
    providers: [
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
})

export { handler as GET, handler as POST }