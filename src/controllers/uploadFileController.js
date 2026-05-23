const File= require("../services/uploadFileService")
const Task = require('../models/taskModel')

module.exports.uploadFile=async(req,res)=>{
    try{
const {intern,task,fileCategory}=req.body


if(!req.file) return res.status(400).json({ message: "No file uploaded" });
 if(fileCategory=="project" && !task){
         return res.status(400).json({
                message:"Task ID is required for project upload"
            })
    }
    const result= await File(
        req.file,
        intern,
        task,
        fileCategory

    )
   
    if(fileCategory=="project"){
 await Task.findByIdAndUpdate(task,{
        status:"submitted"
    })
    }

   
 res.status(200).json({
      message: `${fileCategory} uploaded successfully`,
      data: result
    });
    }
    catch(err){
    res.status(500).json({ message: err.message });

    }
}