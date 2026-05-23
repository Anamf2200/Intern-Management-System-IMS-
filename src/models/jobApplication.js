const mongoose= require('mongoose')

const applicationSchema= new mongoose.Schema({
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    coverLetter:{
        type:String,
        required:true
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    resumeURL:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:['Pending','Shortlisted','Accepted','Rejected']
    }
},
{
    timestamps:true
}
)


module.exports=mongoose.model("Application",applicationSchema)