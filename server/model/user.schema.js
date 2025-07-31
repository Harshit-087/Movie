import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
         required:true
    },
    
    email:{
      type:String,
      unique:true,
      required:true,
    },
    password:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true
    }

},{timestamps:true});

const User = mongoose.model("user",userSchema);

export default User;