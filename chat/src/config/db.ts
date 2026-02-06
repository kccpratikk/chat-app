import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connetDb = async()=>{
   const url = process.env.MONGO_URL;

   if(!url) throw new Error("MONGO_URL is not defined in enviornment variables")

    try{
       
        await mongoose.connect(url,{
            dbName:"chatapp"
        })

        console.log("connected to DB")
    }catch(err){
       console.log(err)
       process.exit(1)
    }
}

export default connetDb