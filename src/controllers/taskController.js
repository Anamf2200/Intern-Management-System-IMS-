const Task= require('../models/taskModel')
const createPdf=require('../services/pdfServices')
const sendEmail= require("../services/emailServices")
const User = require('../models/internModel')
const { stat } = require('node:fs')


module.exports.createTask=async(req,res)=>{
    try{
let {title,description,assignedTo}= req.body
let newTask= await Task.create({
    title,
    description,
    assignedTo
})
res.status(201).json({
    message:"task created",
    data:newTask

})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports.getAllTasks=async(req,res)=>{
    try{
        const tasks= await Task.find()
        res.status(200).json({
count:tasks.length,
data:tasks

        })
    }
     catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.getTaskByInternId=async(req,res)=>{
     try {
        const { id } = req.params;

        const tasks = await Task.find({ assignedTo: id }).populate('assignedTo');

        if (!tasks.length) {
            return res.status(404).json({
                message: "No tasks found for this intern"
            });
        }

        res.status(200).json({
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.updateTask=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,description,deadline}=req.body
        const updatedTask= await Task.findByIdAndUpdate(id,
            {title,description,deadline},
            {new:true, runValidators:true}

        )
        if(!updatedTask) return res.status(404).json({message:"Task is not found"})



            res.status(200).json({
                 message: "Task updated successfully",
                data: updatedTask
            })


    }

      catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports.getInternProgress=async(req,res)=>{
    try{
 const {id}= req.params
    const task= await Task.find({assignedTo:id})
    if(!task) return res.status(404).json({message:"task not found"})

        const total= task.length
        const completed= task.filter(t=>t.status=="completed").length
        const pending= task.filter(t=>t.status=="pending").length
        const inProgress= task.filter(t=>t.status=="in-progress").length
        const progress= total ===0?0:(completed/total)*100

        res.status(200).json({
            totalTask:total,
            completed,
            pending,
            progress:`${progress.toFixed()}%`,
            task
        })
    }

     catch(err){
        res.status(500).json({message:err.message})
    }
    
   



}

module.exports.reviewTask = async (req, res) => {
    try {

        const { id } = req.params
        const { status, feedback } = req.body

        // Find task
        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        // Update task
        task.status = status || task.status
        task.feedback = feedback || task.feedback

        await task.save()

        // If task approved as completed
        if (status === "completed") {

            const internId = task.assignedTo

            // Get all intern tasks
            const tasks = await Task.find({
                assignedTo: internId
            })

            // Check all completed
            const allCompleted = tasks.every(
                t => t.status === "completed"
            )

            if (allCompleted) {

                const intern = await User.findById(internId)

                // Prevent duplicate certificates
                if (!intern.certificateSent) {

                    const filePath = await createPdf(
                        intern.name,
                        task.title,
                        "January 2026 - March 2026",
                        new Date().toDateString()
                    )

                    await sendEmail(
                        intern.email,
                        filePath,
                        intern.name
                    )

                    intern.certificateSent = true

                    await intern.save()
                }
            }
        }

        res.status(200).json({
            message: "Task reviewed successfully",
            data: task
        })

    } catch (err) {

        res.status(500).json({
            message: err.message
        })

    }
}

module.exports.deleteTask=async(req,res)=>{
try{
    const {id}=req.params
    const task= await Task.findByIdAndDelete(id)
    if(!task) return res.status(404).json({message:"no task found to delete "})

        res.status(201).json({message:"Task deleted successfully"})
}
catch (err) {

        res.status(500).json({
            message: err.message
        })

    }

}