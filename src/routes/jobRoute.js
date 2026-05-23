const express = require('express')
const router= express.Router()
const {protect,adminOnly}= require('../middleware/authMiddleware')
const{
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob

}= require('../controllers/jobController')

router.post('/',protect,adminOnly,createJob)
router.get('/',getAllJobs)
router.get('/:id',protect,getJobById)
router.put('/:id',protect,adminOnly,updateJob)
router.delete('/:id',protect,adminOnly,deleteJob)

module.exports=router