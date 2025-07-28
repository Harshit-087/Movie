"use client"
import {useState,useEffect} from "react";
import React from "react";
import {useParams} from "next/navigation";
import axios from "axios";
import Header from "@/components/Header"
import Image from "next/image"
import Link from "next/link"

interface InfoData{
     adult:boolean
    backdrop_path:string
    id:number
    original_language:string
    original_title:string
    overview:string
    popularity:number|0
    poster_path:string
    release_date:string
    title:string
    video:boolean
    vote_average:number
}



export default function Info(){

    const [info,setInfo]=useState<InfoData|null>()
    const [omdbId,setOmdbId]=useState<string|null>()
    
     const params = useParams()
    const id =params?.id?.toString()  
   console.log("id page.tsx for tmdb movie specific",id)

    useEffect(()=>{
       if(id){
        const fetchInfo=async()=>{


         const infoResult = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
           params: {
            api_key:process.env.NEXT_PUBLIC_API_KEY,
            language:"en-US"
        }});
const data =  infoResult.data;
console.log("Movie info:", data);

            setInfo(data);
            
        }
        fetchInfo();
    }else{
        console.log("title is not provided")
    }

    },[id])

  useEffect(()=>{
           const fetchOmdb=async()=>{
               if (info && info.title) {
                   const result = await axios.get(`/route/router2?title=${info.title}`);
                   const data1 =result.data;
                   console.log("page.tsx omdb id:",data1.data)
                   setOmdbId(data1.data)
               }
           }
           fetchOmdb();
       },[info])

  

    return(
        <>
         <div className="bg-blue-200 w-screen min-h-screen flex flex-col gap-20 ">
            <Header/>
            
                {info ?
                    <section className="w-screen  h-[70vh] flex flex-col justify-center items-center max-sm:gap-8 sm:gap-12 md:gap-24 mt-24 md:flex-row   ">
                   <Image
  src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
  alt={info.title}
  width={300} // fallback width
  height={450} // fallback height (typical movie poster ratio)
  className="rounded-lg lg:h-[60vh] md:h-[50vh] sm:h-[60vh] max-sm:h-[25vh] object-cover"
/>

                    
                    <div className=" w-[60vw] h-full flex  items-center bg-red-200  sm:justify-center md:justify-items-start">
                        <section className="md:-translate-y-12 sm:text-center  ">
                             <h1 className="max-sm:text-md sm:text-2xl md:text-3xl lg:text-5xl font-bold font-serif">{info.title}</h1>
                        <h1 className="text-3xl font-semibold font-menlo">
                            {info.overview ?<p className="text-black max-sm:text-sm sm:text-sm md:text-lg lg:text-2xl" >{info.overview.length>400? info.title.slice(0,100)+"..."+info.title:info.overview}</p>:<p className="text-white text-lg">Loading ...</p>}</h1>
                       
                        <h4><span>Popularity: </span> {info.popularity>200.00 ?<span className="max-sm:text-sm sm:text-md md:text-md lg:text-lg  front-serif text-green-500 ">{(info.popularity).toFixed(2)}</span>:<span className="max-sm:text-sm sm:text-md md:text-lg lg:text-lg front-serif text-red-500">{(info.popularity).toFixed(2)}</span>}   </h4>

                        <h4><span>Lang: </span>{info.original_language}</h4>
                       
                        <h4><span>Release_Date: </span>{info.release_date}</h4>
                        <Link href={`/play/${omdbId}`}>
                        <button className="bg-white border-2 border-black text-2xl w-[4rem] h-[2rem] rounded-4xl" >Play</button>
                        </Link>
                        </section>
                    </div>
                     </section>
                     :<p className="text-4xl font-serif">loading... </p>
                }
           
        </div>
        </>
    )
}