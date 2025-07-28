import {useState} from "react";

export default function Aside(){
    const [show,setShow]=useState<boolean>(false)

   const showBar=()=>{

      setShow(!show)
   }

    return(
        <>
        
        {show && show?<aside className="fixed left-0 top-30 h-[70vh] rounded-2xl w-[5vw] bg-red-200">
            <h1 className=" w-full " onClick={()=>{showBar()}}>5</h1>

        </aside>
            :<aside className="w-[3vw] h-[5vh] bg-violet-500 fixed left-0 top-30 rounded-r-4xl  " onClick={()=>showBar()}>m</aside>}
        </>
        
    )
}