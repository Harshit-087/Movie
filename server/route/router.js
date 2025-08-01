import express  from "express";
import dotenv from"dotenv"
import cors from "cors"
import axios from "axios"
 
import User from "../model/user.schema.js"
dotenv.config()

const router = express.Router();


router.use(cors())

router.post("/signin",async(req,res)=>{
  const {userName,password,number,email}= req.body;
    const createdUser = await User.create({
      userName,
      password,
      number, 
      email
    })
    res.status(200).json({msg:"success user register"})
})

router.post("/login",async(req,res)=>{
  const {userName,email,password}=req.body
  const userExist=await User.findOne({email:email})
  if(userExist){
    res.status(200).json({msg:"login success"})
  }else{
    res.status(500).json({msg:"no user exist"})
  }
})


router.get("/player", async (req, res) => {
  const id = req.query.id;
  const result = await axios.get(`${process.env.VIDEO_API}/${id}`);
  // console.log("bbb:", result);

  res.status(200).json( result.config.url ); // ⚠️ result.url is NOT valid
});



router.get("/movie",async(req,res)=>{
    const title = req.query.t;
    const result=await axios.get(`http://www.omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&t=${title}`);
    const data =  result.data.imdbID;
    console.log("backend movie title:",data)
    res.status(200).json(data);

})
router.get("/video", async (req, res) => {
  const params = req.query.video_id;
  const result = await axios.get(`${process.env.VIDEO_API}/${params}`);
  // console.log("aaaa:", result);

  res.status(200).json( result.config.url ); // ⚠️ result.url is NOT valid
});

router.get("/nowplay",async(req,res)=>{
  // const value = req.query
  //  console.log("apikey:",process.env.TMDB_API_KEY)
  const result=await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
        const data= result.data.results;
        console.log("NowPlaying data:",data);
        res.status(200).json(data)

})


router.get("/toprated",async(req,res)=>{
  // const value=req.query
  // console.log("apikey:",process.env.TMDB_API_KEY)
  const result = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=5`)
        const data =  result.data.results;
        console.log("top rated data :",data)
           res.status(200).json(data)
})

router.get("/popular",async(req,res)=>{
  // const value=req.query
  //  console.log("apikey:",process.env.TMDB_API_KEY)
   const popularResult=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=2`);
        const data= popularResult.data.results;
        console.log("popular data:",data);
         res.status(200).json(data)
})

router.get("/upcoming",async(req,res)=>{
  // const value = req.query
  //  console.log("apikey:",process.env.TMDB_API_KEY)
      const upcomingResult=await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=3`);
        const data= upcomingResult.data.results;
        console.log("upcoming data:",data);
           res.status(200).json(data)
})
export default router;