const Application= require('../models/jobApplication')
const uploadResume= require('../services/uploadResume')

module.exports.jobApply=async(req,res)=>{
    try{
const {coverLetter,applicant,job} = req.body
let resumeURL=""
if(req.file){
    resumeURL= await uploadResume(req.file)
}
const application= await Application.create({
    applicant,
    job,
    coverLetter,
    resumeURL
})
 res.status(201).json({
      message: "Application submitted successfully",
      data: application
    });
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.getAllAplication=async(req,res)=>{
    try{
const allApplication= await Application.find()
res.status(200).json({
    count:allApplication.length,
    data:allApplication
})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.getApplicationById=async(req,res)=>{
    try{
const {id}= req.params
const getApplication= await Application.findById(id)
if(!getApplication) {
    return res.status(404).json({
        message:"No application found"
    })
}
res.status(200).json({
    data:getApplication
})
    }
    catch(err){
        res.status(500).json({message:
    err.message
        })
    }
}

module.exports.updateApplication=async(req,res)=>{
    try{
const {id}= req.params
const {status}=req.body

const updatedApplication=await Application.findByIdAndUpdate(
    id,
    {status},
    {
        new:true,
        runvalidators:true
    }
)
if(!updatedApplication){
    return res.status(404).json({
        message:"No job application found"
    })
}
res.status(201).json({
    message:"Application updated successfully",
    data:updatedApplication
})
    }
    catch(err){
          res.status(500).json({message:
    err.message
        })
    }
}

module.exports.deleteApplication=async(req,res)=>{
    try{
const {id}= req.params
const application= await Application.findByIdAndDelete(id)
if(!application){
    return res.status(404).json({
        message:"No application found"
    })
}
res.status(200).json({
    message:"Job Application deleted successfully"
})
    }
    catch(err){
          res.status(500).json({message:
    err.message
        })
    }
}