"use client";

import {useState,useEffect} from "react"
import TopLoader from "@/components/Toploader";
import Toprated from "@/components/Toprated";
import Popular from "../components/Popular";
import Upcomming from "../components/upcomming";
import NowPlaying from "../components/NowPlaying";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aside from "@/components/Aside"

export default  function Page(){
 
 const [url ,setUrl]=useState<string|null>(null)

 useEffect(()=>{
  const fetchUrl=async()=>{
    const result =await fetch("/route/router1?video_id=tt0108052")
    if(result.ok){
      const data =await result.json()
      console.log("data:",data)
      setUrl(data.embedUrl)
    
      }else{
      console.error("failed to fetch video url")
    }
  }
  fetchUrl();
 },[])

 
  return(
    <>
    
   

    <div className="
    w-screen max-sm:h-[30vh]
    sm:h-[50vh] md:h-[70vh] lg:h-[80vh]   xl:h-[90vh] 
    flex flex-col justify-center items-center  gap-12 ">
    
      <Header/>
    {url?<TopLoader data={url}/>:<p>loading....</p>}
    
   </div>
 <Aside/>
   <section className="w-screen   flex flex-col gap-8 sm:h-[180vh] md:h-[220vh] lg:h-[260vh] xl:h-[300vh] mt-24!">
    
    <Popular/>
    <Toprated/>
    <Upcomming/>
    <NowPlaying/>
   </section>
    
    
    <Footer/>
    </>
  )
}