"use client"
import React,{useState,useEffect} from "react";
import axios from "axios";
import MovieData from "../../components/interfaceMovies";

export default function AllMovies(){
   const [allMovies,setAllMovies]=useState<MovieData[]>([]);

    useEffect(()=>{ 
        const fetchAllMovies=async()=>{
            const result=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`);
            const response=result.data.movies;
        }
        fetchAllMovies();
       },[])
 
    
    return(
         <>
         <div className="w-screen h-screen flex justify-center items-center">
            {allMovies[0].title}
         </div>
         </>
    )
}