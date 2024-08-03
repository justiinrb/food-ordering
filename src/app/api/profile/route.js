import {authOptions} from '../../api/auth/[...nextauth]/route'
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from '../../models/user';

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    //console.log({session,data})
    const email = session.user.email;
    //console.log({data})
   
    if ('name' in data){
        
      await User.updateOne({email},{name: data.name})
       //uptade user name
    
    }
    return Response.json(true);
}



 //uptade user name
        //console.log({email,update:{name: data.name}})
        /*const user = await User.findOne({email});
      user.name = data.name;
      await user.save();
      console.log({email,update:{name: data.name}})*/