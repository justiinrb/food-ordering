//Este código define una ruta HTTP POST que crea un nuevo usuario en la base de datos MongoDB.
import { User } from "../../models/user"
import bcrypt from 'bcrypt'
import mongoose from "mongoose"

export async function POST(req){
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
    if(!pass?.length || pass.length < 5 ){
        new Error('passwor must be at least 5 characters');
    }
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);
         
    
    const createUser = await User.create(body);
    return Response.json(createUser);
}