const mongoose= require('mongoose')
const connectDB= async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL)
    // console.log("Mongo connected")
    }
    catch(err){
        console.log("there are some error in connecting DB", err)
            process.exit(1)

    }
    
}

module.exports= connectDB