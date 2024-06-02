import bcrypt from 'bcrypt';
import {model, Schema ,models} from 'mongoose';

const UserSchema = new Schema({
    email:{type:String,required:true, unique:true},
    password: {type:String, 
        required:true,
        validate:pass=>{
       
        if(!pass?.length || pass.length < 5 ){
            new Error('passwor must be at least 5 characters');
            
        }
        
    },
  },
},{timestamps:true});


UserSchema.post('validate', function (user){
   const notHashedPassword = user.password;
   const salt = bcrypt.genSaltSync(10);
   user.password = bcrypt.hashSync(notHashedPassword, salt);
   
});

export const User = models?.User || model("User", UserSchema);

/*
UserSchema.pre('save',(next, ...rest) =>{
    console.log(rest)
    next()

    UserSchema.post('validate',fuction (user) =>{
        user.password = 'veolacontraseña';
})
*/