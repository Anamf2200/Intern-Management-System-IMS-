const bucket = require('../config/firebase')

const uploadResume=(file)=>{
return new Promise((resolve,reject)=>{
const fileName= `resumes/${Date.now()}-${file.originalname}`
const fileRef =bucket.file(fileName)

const stream=fileRef.createWriteStream({
    metadata:{
        contentType:file.mimetype
    }
})
stream.on('error',(err)=>{
    reject(err)
})
stream.on('finish',async()=>{
    try{
         const url=`https://storage.googleapis.com/${bucket.name}/${fileRef.name}`
    resolve(url)
    }
    catch(err){
        reject(err)
    }
   
})
stream.end(file.buffer)


})
}
module.exports=uploadResume