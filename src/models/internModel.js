const mongoose= require('mongoose')
const { timeStamp } = require('node:console')

const internSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']

    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]

    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    role:{
        type:String,
        enum:['admin','intern'],
        default:"intern"
    },
    certificateSent: {
    type: Boolean,
    default: false
}
},

{
        timeStamps:true

}


)

module.exports=mongoose.model("User",internSchema)