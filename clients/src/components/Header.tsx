import Image from "next/image";
import React,{useState,useEffect} from "react";
import Link from "next/link"
import axios from "axios";

export default function Header(){
    
    const [movie,setMovie]=useState<string>("")

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setMovie(value);
    }

    
        useEffect(()=>{
            if(movie.length>0){
       const fetchMovies = async()=>{
        console.log("search movie")
        // console.log("url:",process.env.NEXT_PUBLIC_BACKEND_URL);
        const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search/movie`,{
            params:{
                query:movie
            }
        });
        const response = result.data.query;
        console.log("response",response);
       }
       fetchMovies();
    }
        },[movie])
    

    return(
     <>
     <nav className="bg-black text-xl font-serif h-[80px] w-full flex  justify-around items-center gap-4 relative top-0 left-0 max-sm:top-10 ">
        <Image src={"/logo.jpg"} alt="Cine" width="61" height="60" className="!ml-2 " ></Image>
      
        <input type="text"
        id="movie"
        name="movie"
        value={movie}
        onChange={handleInputChange}
        className="bg-white rounded-3xl !px-2 !py-1 border-none text-gray-400 max-sm:w-[120px]" placeholder="Search..."/>
      
              <ul className="w-[50%] flex justify-evenly items-center  ">
            <li className="header-Effect">Home</li>
            <li className="header-Effect">Movies</li>
            <li className="header-Effect">Tv</li>
            <li className="header-Effect">Cast</li>
            <li className="header-Effect">More</li>
            <li className="rounded-lg flex justify-center items-center text-white text-lg w-[3vw] border-2 border-white ">en</li>
            <Link href="/login">
            <li className="header-Effect">Login</li></Link>
            {/* <li className=" rounded-full bg-red-200 header-lang  w-[3vw] h-[3vw] flex justify-center items-center">H</li> */}
        </ul>
             
     </nav>
     </>
    )
} 