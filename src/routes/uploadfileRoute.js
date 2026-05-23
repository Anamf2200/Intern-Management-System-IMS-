const express= require('express')
const router= express.Router()
const {uploadFile}=require("../controllers/uploadFileController")
const upload= require("../middleware/multer")
const {protect}=require('../middleware/authMiddleware')

router.post('/',protect,upload.single("file"),uploadFile)

module.exports=router