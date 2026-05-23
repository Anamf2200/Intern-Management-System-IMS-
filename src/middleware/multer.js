const multer= require("multer")
const storage= multer.memoryStorage()

const fileFilter=(req,file,cb)=>{
    const allowedTypes=[
         "application/pdf",
    "image/png",
    "image/jpeg",
    "application/zip",
    ]

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error("invalid file type"),false)
    }
}

const upload=multer({
    storage,
    limits:{fileSize:5 * 1024 *1024},
    fileFilter
})


module.exports=upload