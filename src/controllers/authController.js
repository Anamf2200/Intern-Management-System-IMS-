const User= require("../models/internModel")
const  bcrypt= require("bcrypt")
const jwt= require('jsonwebtoken')

const generateToken= (id,role)=>{
    return jwt.sign({id,role},
process.env.JWT_SECRET,
{
    expiresIn:'2d',
}

    )
}
module.exports.registerUser=async(req,res)=>{

    try{

        const {name,email,password,role}=req.body

    const existingIntern= await User.findOne({email})
    if(existingIntern) return res.status(400).json({message:"Intern already exist"})
       const hashedpassword= await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:hashedpassword,
        role
    })

     res.status(201).json({
      message: "User created successfully",
      token: generateToken(user._id,user.role),
          user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    })
    }
    catch(err){
                res.status(500).json({message:err.message})
    }
    

}

module.exports.loginUser=async(req,res)=>{
try{
const {email,password}=req.body
const user= await User.findOne({email})
if(!user){
    return res.status(400).json({
        message:"Invalid credentials"
    })
}

const isMatch= await bcrypt.compare(
    password,
    user.password
)
if(!isMatch){
return res.status(400).json({
        message:"Invalid credentials"
    })}
    res.status(200).json({
        message:"Login Successfully",
        token:generateToken(user._id,user.role),
          user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    })
}
catch(err){
 res.status(500).json({message:err.message})

}

}