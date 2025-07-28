import {NextResponse,NextRequest } from "next/server";

export  async function GET(req:NextRequest){
  
    const params=new URL(req.url)
    const value =params.searchParams.get("video_id")
    console.log("going id to backend:",value)
  
    const result = await fetch (`http://localhost:4000/video/?video_id=${value}`)
    
    const data= await result.json();
    console.log("route:",data)
    return NextResponse.json({embedUrl:data.data})
}



