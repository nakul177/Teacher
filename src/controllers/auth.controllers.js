require("dotenv").config()

const Admin = require("../model/admin.model")

const jwt = require("jsonwebtoken")

const newtoken = (admin) => {
return jwt.sign({ admin }, process.env.JWT_SECRET_KEY);

}

const register = async (req , res) => {
    try{
        
        let  admin = await Admin.findOne({email:req.body.email}).lean().exec()

        if(admin) return res.status(400).send("Please Use another E-Mail")
        
        admin = await Admin.create(req.body)

        const token = newtoken(admin)

     return res.status(200).send({admin , token})

    }catch(err){
        return res.status(500).send(err.message)
    }
}

const login = async (req , res) => {
    try{

        const admin = await Admin.findOne({email:req.body.email})
        
        if(!admin) return res.status(400).send("Please Use another E-Mail OR Password")

         const match = admin.checkpassword(req.body.password)
         
         if(!match) return res.status(400).send("Please Use another E-Mail OR Password")

         const token = newtoken(admin)

         return res.status(200).send({admin , token})

    }catch(err){
        return res.status(500).send(err.message)
    }
}

module.exports ={ register , login}