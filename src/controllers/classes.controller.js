const express=require("express");
const router=express.Router();
const Classes =require("../model/classes.model");

router.post("",async(req,res)=>{
    try{
        const classes=await Classes.create(req.body);
        return res.status(201).send(classes); 

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
});

router.get("",async(req,res)=>{
    try{
        const classes=await Classes.find().lean().exec();
        return res.status(200).send(classes); 

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
});

router.get("/:id" , async(req , res) =>{
    try{
        const classes = await Classes.findById(res.params.id).lean().exec()
        return res.status(201).send(classes)
  }catch(err){
      return res.status(500).send(err.message)
  }
})

router.patch("/:id" , async(req , res) =>{
    try{
        const classes = await Classes.findByIdAndUpdate(req.params.id , req.body ,{
            new:true
        })
  return  res.status(201).send(classes)

  }catch(err){
      return res.status(500).send(err.message)
  }
})


module.exports=router;