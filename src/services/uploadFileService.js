const bucket=require("../config/firebase")
const File= require("../models/uploadFileModel")

const uploadFiles=async(file,internId,taskId,fileCategory )=>{

    return new Promise((resolve,reject)=>{
        const fileName= `${Date.now()}-${file.originalname}`
        const fileRef=bucket.file(fileName)

        const stream=fileRef.createWriteStream({
            metadata:{
              contentType:file.mimeType

            }
        })
        stream.on('error',(err)=>{
            reject(err)
        })
        stream.on('finish',async()=>{
            try{
                const fileUrl=`https://storage.googleapis.com/${bucket.name}/${fileRef.name}`
                const savedFile=await File.create({
                    intern:internId,
                    task:taskId,
                    fileName,
                    fileUrl,
                    fileType:file.mimeType,
                    fileSize:file.size,
                    fileCategory
                })

                resolve(savedFile)
            }
            catch(err){
reject(err)
            }
        })

        stream.end(file.buffer)
    })
}

module.exports=uploadFiles