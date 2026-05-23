const express= require('express')
const router= express.Router()
const {protect,adminOnly}= require('../middleware/authMiddleware')

const {
    createTask,
    getAllTasks,
    updateTask,
    getInternProgress,
    reviewTask,
    getTaskByInternId,
    deleteTask
}= require('../controllers/taskController')

router.post('/',protect,adminOnly,createTask)
router.get("/",protect,getAllTasks)
router.get("/progress/:id",protect,getInternProgress)
router.get("/:id",protect,getTaskByInternId)
router.patch("/:id",protect,adminOnly,updateTask)
router.patch('/:id/review',protect,adminOnly,reviewTask)
router.delete('/:id',protect,adminOnly,deleteTask)



module.exports=router