const mongoose = require("mongoose")


const teacherSchema = new mongoose.Schema({
    name:{type:String , required:true},
    gender:{type:String , required:true , unique:true},
    age:{type:Number , required:true},
    classes_id:[{type:mongoose.Schema.Types.ObjectId , ref:"classes" , required:true}]
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("teacher" , teacherSchema)