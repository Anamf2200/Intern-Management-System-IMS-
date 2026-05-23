const mongoose= require("mongoose")


const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       required: [true, "Intern ID is required"]

    },
    status:{
        type:String,
        enum:["pending","in-progress","completed","submitted"],
        default:"pending"
    },
    feedback:{
        type:String,
        default:""
    },

    deadline:{
        type:Date
    }
},
{
        timeStamps:true

}
)

module.exports=mongoose.model("Task",taskSchema)