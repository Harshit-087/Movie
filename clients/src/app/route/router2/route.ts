import {NextResponse,NextRequest} from "next/server";
import axios from "axios"


export async function GET(req:NextRequest){
    
    const params = new URL(req.url)
    const title = params.searchParams.get("title") // see searchParams?
    console.log("route2.ts:",title);
    const result = await axios.get(`${process.env.BACKEND_URL}/movie?t=${title}`)
    const data =  result.data;
    console.log("route movie data :",data)

    
    return(
       NextResponse.json({data}) 
    )
}