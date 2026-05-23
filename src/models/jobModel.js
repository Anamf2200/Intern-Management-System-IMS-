const mongoose = require("mongoose")
const { timeStamp } = require("node:console")

const jobSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },

    title:{
        type:String,
        required:true
    },
    company:{
type:String,
required:true
    },

    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:['Internship','Fulltime','Parttime','Remote']
  },

  salary:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
   requirements:{
    type:String,
    required:true
  },
   skills:{
    type:String,
    required:true
  }
},{
    timestamps:true
}
)

module.exports=mongoose.model("Job",jobSchema)