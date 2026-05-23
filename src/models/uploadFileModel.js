const mongoose= require("mongoose")
const fileSchema= new mongoose.Schema({
    intern:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
    default:null

    },
     fileCategory:{
        type:String,
        enum:["resume","project"],
        required:true
    },
    fileName:String,
    fileUrl:String,
    fileType:String,
    fileSize:String,
    uploadedAt:{
type:Date,
default:Date.now()
    }
})

module.exports=mongoose.model("File",fileSchema)