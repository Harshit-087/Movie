import Image from "next/image"

export default function Footer(){
    
    return(
        <>
        <footer className="bg-black w-screen h-[20rem] flex justify-center items-center p-4">
            <Image src={"/logo.jpg"} alt="Cine" width="190" height="180" ></Image>

           <div className="bg-red-200 w-[60%] h-[70%] flex ">
            <ul>
                <li className="test-5xl font-bold">Basics</li>
                <li className="text-xl text-white ">hi </li>
                <li className="text-xl text-white ">dsfdf</li>
                <li className="text-xl text-white ">dfsdg</li>
            </ul>
            </div>
        </footer>
        </>
    )
}