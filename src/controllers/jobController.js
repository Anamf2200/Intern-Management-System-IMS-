const Job = require("../models/jobModel")


module.exports.createJob = async (req, res) => {
    try{
const { title, company, location, jobType, salary, description, requirements, skills } = req.body
const createJob= await Job.create({
    title,
    company,
    location,
    jobType,
    salary,
    description,
    requirements,
    skills
})
res.status(201).json({message:"job created successfully", data:createJob})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }


}
    

 







module.exports.getAllJobs=async(req,res)=>{
    try{
const allJobs=await Job.find()
res.status(200).json({
    count:allJobs.length,
    data: allJobs
})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.getJobById=async(req,res)=>{
    try{
const {id}=req.params
const job= await Job.findById(id)
if(!job){
return res.status(404).json({
        message: "Job not found"
      }); 

} 
res.status(200).json({
data:job

})
    }
    catch(err){
   res.status(500).json({message:err.message})

    }
}

module.exports.updateJob=async(req,res)=>{
    try{
   const {id}=req.params
const updatedData =req.body
const updatedJob= await Job.findByIdAndUpdate(
    id,
    updatedData,
     {
            new:true,
            runValidators: true

        }
)
if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }
res.status(200).json({
    message:"job updated successfully",
    data:updatedJob
})
    }
     catch(err){
   res.status(500).json({message:err.message})

    }
 

}

module.exports.deleteJob=async(req,res)=>{
    try{
    const {id}=req.params
    const deletedJob= await Job.findByIdAndDelete(id)
    if(!deletedJob) {
              return res.status(404).json({
        message: "Job not found"
      });

    }
    res.status(200).json({
        message:"job deleted successfully"
    })


    }
       catch(err){
   res.status(500).json({message:err.message})

    }

}