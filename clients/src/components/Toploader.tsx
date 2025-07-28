export default function TopLoader({data}:{data:string|null}) {
    return(
        <>
        <div className="bg-blue-200 
        max-sm:w-[80%] max-sm:h-[80%] 
        sm:h-[80%] sm:w-[80%] 
        md:h-[80%] md:w-[85%]
        lg:h-[80%] lg:w-[80%]
        xl:h-[90%] xl:w-[80%]
        rounded-lg flex justify-center items-center  mt-6!">
      <iframe src={data!}  allow="autoplay; fullscreen " className=" w-full h-full object-contain"  ></iframe>

        </div>
        </>
    )}