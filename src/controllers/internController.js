const User = require("../models/internModel")
const bcrypt= require("bcrypt")


// module.exports.createIntern=async(req,res)=>{

//     try{

//         const {name,email,password,role}=req.body

//     const existingIntern= await User.findOne({email})
//     if(existingIntern) return res.status(400).json({message:"Intern already exist"})
//        const hashedpassword= await bcrypt.hash(password,10)
//     const user = await User.create({
//         name,
//         email,
//         password:hashedpassword,
//         role
//     })

//      res.status(201).json({
//       message: "User created successfully",
//       data: user
//     })
//     }
//     catch(err){
//                 res.status(500).json({message:err.message})
//     }
    

// }


module.exports.getAllInterns=async(req,res)=>{

    try{
        const interns= await User.find()
        res.status(200).json({
            count:interns.length,
            data:interns
        })
    }

    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.getInternById=async(req,res)=>{
    try{

        const {id}=req.params
        const intern= await User.findById(id)
        if(!intern)return res.status(404).json({message:"intern not found"})
            res.status(200).json({
        data:intern
        
            })
    }

    catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports.updateIntern=async(req,res)=>{
  try{
      const {id}=req.params
     let updateData= {...req.body}

     if(updateData.password){
        updateData.password=await bcrypt.hash(updateData.password,10)
     }
     let updatedIntern= await User.findByIdAndUpdate(
        id,
        updateData,
        {
            new:true,
            runValidators: true

        }

     )
     if(!updatedIntern) return res.status(404).json({message:"Intern not found"})
        res.status(200).json({
    message:"Intern updated successfully",
    data:updatedIntern

})
  }
 catch(err){
        res.status(500).json({message:err.message})
    }

}

module.exports.deleteIntern=async(req,res)=>{
    try{
  const {id}=req.params
        const intern= await User.findByIdAndDelete(id)
        if(!intern) return res.status(404).json({message:"Intern not found"})
       res.status(200).json({message:"Intern deleted successfully"})

        }

        catch(err) {
            res.status(500).json({message:err.message})
        }
  
}