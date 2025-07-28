import {NextResponse,NextRequest } from "next/server";
import axios from "axios"


export  async function GET(req:NextRequest){
  
    const params=new URL(req.url)
    const value =params.searchParams.get("video_id")
    console.log("going id to backend:",value)
  
    const result = await axios.get(`${process.env.BACKEND_URL}/video/?video_id=${value}`)
    
    const data= result.data;
    // console.log("route:",data)
    return NextResponse.json(data)
}



