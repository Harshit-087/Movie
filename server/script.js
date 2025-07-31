import express from "express";
import cors from "cors";
import router from "./route/router.js"
import connectionDB from "../../db/connection.js"

const app =express();
connectionDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/",router)

   
app.listen(4000,()=>{
    console.log("server is running on port 4000")
})