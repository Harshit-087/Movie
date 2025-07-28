import {useState,useEffect} from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image"
import axios from "axios"
import {motion} from "framer-motion"

interface popularData{
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

export default function Popular(){
   const [popular,setPopular]=useState<popularData[]|null>(null);
   
   useEffect(()=>{
    const fetchPopular=async()=>{
        // console.log("API KEY:", process.env.NEXT_PUBLIC_API_KEY);

        const popularResult=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/popular`);
        const popularData= popularResult.data.popular;
        console.log("popular data:",popularResult);
        setPopular(popularData)
    }
    fetchPopular()
   },[])
   
    return(
      <>
     <section className="w-screen max-sm:h-[30vh]  sm:h-[50vh] md:h-[60vh] lg:h-[70vh] flex flex-col gap-8">
    <h1 className=" text-black text-4xl px-8">What&apos;s Popular</h1>
    <div className="overflow-x-auto   w-screen  flex gap-4 mx-12 overflow-y-hidden">
            {popular&& popular.map((movie:popularData)=>(
                <motion.div
                initial={{opacity:0 , y:30}}
                animate={{opacity:1,y:0}}
               key={movie.id}
               className="flex-none w-[140px] sm:w-[180px] md:w-[210px] lg:w-[230px] overflow-hidden shadow-lg hide-scrollbar rounded-lg">
  <Link href={`/movie/${movie.id}`}>
    <Image
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      width={230} // Set max width image ever goes to
      height={345} // Adjust height to match image ratio
      className="rounded-lg object-cover w-full h-auto"
    />
  </Link>

  <section className="mt-2 text-center max-sm:hidden">
    <h3 className="font-serif text-black text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl flex justify-around">
      {movie.vote_average}/10
      {movie.popularity > 200.0 ? (
        <span className="text-green-500">{movie.popularity.toFixed(2)}M</span>
      ) : (
        <span className="text-red-500">{movie.popularity.toFixed(2)}M</span>
      )}
    </h3>
    <h3 className="truncate font-serif text-black text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
      {movie.title}
    </h3>
  </section>
</motion.div>

            ))}
              </div>
              </section>
        </>
    )
}