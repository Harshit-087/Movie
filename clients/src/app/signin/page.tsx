"use client"
import React,{useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

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
    const router = useRouter();
     
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
            
            setTimeout(()=>{
              router.push("/login")
            },100)
          
            
        }
    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Sign In</h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">

                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="userName"
                            value={data.userName}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="number" className="block text-gray-700 text-sm font-semibold mb-2">Phone Number:</label>
                        <input
                            type="tel"
                            id="number"
                            name="number"
                            value={data.number}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}