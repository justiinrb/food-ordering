
import {model,models,Schema} from "mongoose";
import { type } from "os";

const UserSchema = new Schema({
    name :{type: String},
    email:{type:String,required:true, unique:true},
    password: {type:String },
    image:{type:String},
},{timestamps:true});

export const User = models?.User || model("User", UserSchema);

/*
UserSchema.pre('save',(next, ...rest) =>{
    console.log(rest)
    next()

    UserSchema.post('validate',fuction (user) =>{
        user.password = 'veolacontraseña';
})
*/