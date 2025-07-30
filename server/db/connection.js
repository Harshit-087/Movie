import mongoose from "mongoose"

const connectionDB=async(req,res)=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/Movie`,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log("mogodb connected success")
    }catch(error){
       console.log("error",error.message)

    }
}
export default connectionDB;

