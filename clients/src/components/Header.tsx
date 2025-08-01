import Image from "next/image";
import Link from "next/link"
export default function Header(){
   
   
    return(
     <>
     <nav className="bg-black text-xl font-serif h-[80px] w-full flex grow-1 shrink-0 justify-around items-center gap-8 sticky top-0 left-0 ">
        <Image src={"/logo.jpg"} alt="Cine" width="61" height="60" className="!ml-2 " ></Image>
      
        <input type="text" className="bg-white rounded-3xl !px-4 !py-1 border-none" placeholder="Search..."/>
      
              <ul className="w-[50%] flex justify-evenly items-center  ">
            <li className="header-Effect">Home</li>
            <li className="header-Effect">Movies</li>
            <li className="header-Effect">Tv</li>
            <li className="header-Effect">Cast</li>
            <li className="header-Effect">More</li>
            <li className="rounded-lg flex justify-center items-center header-lang w-[3vw] border-2 border-white ">en</li>
            <Link href="/login">
            <li className="header-Effect">Login</li></Link>
            {/* <li className=" rounded-full bg-red-200 header-lang  w-[3vw] h-[3vw] flex justify-center items-center">H</li> */}
        </ul>
             
     </nav>
     </>
    )
} 