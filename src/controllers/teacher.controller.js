const express=require("express");
const router=express.Router();
const Teacher =require("../model/teacher.model");

router.post("",async(req,res)=>{
    try{
        const teacher=await Teacher.create(req.body);
        return res.status(201).send(teacher); 

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
});

router.get("",async(req,res)=>{
    try{
        const teacher=await Teacher.find().lean().exec();
        return res.status(200).send(teacher); 

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
});

router.get("/:id" , async(req , res) =>{
    try{
        const teacher = await Teacher.findById(res.params.id).lean().exec()
        return res.status(201).send(teacher)
  }catch(err){
      return res.status(500).send(err.message)
  }
})

router.patch("/:id" , async(req , res) =>{
    try{
        const teacher = await Teacher.findByIdAndUpdate(req.params.id , req.body ,{
            new:true
        })
  return  res.status(201).send(teacher)

  }catch(err){
      return res.status(500).send(err.message)
  }
})

module.exports=router;