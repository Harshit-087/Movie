"use client"
import React,{useState} from "react"
import axios from "axios"

interface Detail{
 userName:string;
 email: string;
 number: string;
 password: string;
}

export default function Signin(){
    const [data,setData]=useState<Detail>({
        userName:"",
        email:"",
        number:"",
        password:""
    })
     
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       const {name,value}= e.target;
        setData(prev=>({
            ...prev,[name]:value
        }));
}

 const handleSubmit=async(e:React.ChangeEvent<HTMLFormElement>)=>{
            e.preventDefault();
         const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`,data,{
          headers:{
            "content-type":"application/json"
          }
         })
         const response = result.data.msg;

            console.log(response);
        }
    return(
        <>
        <div className="bg-red-200 flex p-24">
          <h1 className="text-5xl font-serif text-black">Sign In:</h1>
       <form onSubmit={handleSubmit} action="/"  encType="application/x-www-form-urlencoded" className="bg-white flex flex-col p-24 ">
    
     
     <label htmlFor="username" >Username:</label>
        <input type="text" 
        id="username"
          name="userName"
        value={data.userName}
        onChange={handleInputChange}
        placeholder="eenter name "></input>

      
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

        <label htmlFor="number">Number:</label>
        <input
          type="tel"
          id="number"
          name="number"
          value={data.number}
          onChange={handleInputChange}
          placeholder="Enter number"
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
        </form>
        </div>
        </>
    )
}