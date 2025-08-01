"use client"

import React,{useState} from "react"
import Link from "next/link"
import axios from "axios"
import {useRouter} from "next/navigation"

interface Detail{
    userName:string,
    email:string,
    password:string
}

export default function Login(){
    const[data,setData]=useState<Detail>({
        userName:"",
        email:"",
        password:""
    })
    const router = useRouter();
    const [msg,setMsg]=useState<string|null>(null)

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name ,value} = e.target;
      setData(prev=>({
        ...prev,[name]:value
      }))
      
    }
    
    const handleSubmit=async(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`)
        const data = result.data.msg;
        console.log(data)
        setMsg(data);
        alert(msg);
        
        setTimeout(()=>{
          router.push("/")
        },100)
      
    }
    
    return(
        <>
                <div className="bg-red-200 flex p-24">
          <h1 className="text-5xl font-serif text-black">Sign In:</h1>
        <form onSubmit={handleSubmit} method="Post" action="/" encType="application/x-www-form-urlencoded" className="bg-white flex flex-col p-24 ">
        
        <label htmlFor="userName">Username:</label>
        <input type="text"
        id="username"
        name="userName"
        value={data.userName}
        onChange={handleInputChange}
        placeholder="enter username"/>

         <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          required
        />

        <button type="submit">Submit</button>
        <Link href="/signin">
        <button >create new account</button>
        </Link>
        </form>
        </div>
        </>
    )
}