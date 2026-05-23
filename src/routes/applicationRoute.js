const express= require('express')
const router= express.Router()
const {jobApply, getAllAplication, getApplicationById, deleteApplication, updateApplication}= require('../controllers/applicationController')
const upload = require('../middleware/multer')
const {protect,adminOnly}=require('../middleware/authMiddleware')

router.post('/',protect,upload.single("resumeURL"),jobApply)
router.get('/',protect,adminOnly,getAllAplication)
router.get('/:id',protect,getApplicationById)
router.delete('/:id',protect,adminOnly,deleteApplication)
router.patch('/:id/status',protect,adminOnly,updateApplication)

module.exports=router