const jwt = require('jsonwebtoken')

module.exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1]
    }

     if(!token){
         return res.status(401).json({
      message: "No token provided",
    });
    }

    try{
        const decoded= jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user= decoded
        next()

    }

    catch(err){
     return  res.status(401).json({message:"invalid token"})
    }
   
}


module.exports.adminOnly = async (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    next();
};