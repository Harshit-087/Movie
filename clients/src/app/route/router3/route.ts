

import {NextResponse,NextRequest} from "next/server"
import axios from "axios"


export  async function GET(req:NextRequest){

    const params= new URL(req.url);
    const id=params.searchParams.get("id");
    console.log("route3:",id)
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/play?id=${id}`);
    const data =result.data; 

    return(NextResponse.json({url:data}))
}
