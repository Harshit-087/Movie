"use client"
import {useParams} from "next/navigation"
import {useEffect,useState} from "react"
import axios from "axios"

export default function Player(){
     const[data,setData]=useState<string|null>()
   const params = useParams();
   const id=params.id;
    console.log("play /[id]:",id)
      useEffect(()=>{
       if(id){
        const fetchInfo=async()=>{


         const infoResult = await axios.get(`/route/router3?id=${id}`)
      const data =  infoResult.data.url;
      console.log("Movie info:", data);

            setData(data);
            
        }
        fetchInfo();
    }else{
        console.log("title is not provided")
    }

    },[id])

    return(
        <>
         <div className="bg-blue-200 w-screen h-screen flex justify-center items-center">
            <div className="bg-red-200
        max-sm:w-[80%] max-sm:h-[80%] 
        sm:h-[80%] sm:w-[80%] 
        md:h-[80%] md:w-[85%]
        lg:h-[80%] lg:w-[80%]
        xl:h-[90%] xl:w-[80%]
        rounded-lg   mt-6! rounded-t-2xl overflow-hidden">
      <iframe
  src={`${data!}?controls=1`}
  allow="autoplay; fullscreen"
  
  className="w-full h-full object-contain"
/>

</div>
        </div>
        </>
    )
}