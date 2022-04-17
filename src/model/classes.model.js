const mongoose = require("mongoose")


const classesSchema = new mongoose.Schema({
    grade:{type:String , required:true},
    section:{type:String , required:true , unique:true},
    subject:[{type:String , required:true}],
    // teacher_id:{type:mongoose.Schema.Types.ObjectId , ref:"teacher" , required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("classes" , classesSchema)