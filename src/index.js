require("dotenv").config()
const express = require("express");
const app = express();
const connect = require("./configs/db");

app.use(express.json())

const Admin = require("./model/admin.model")
const { body, validationResult } = require('express-validator');

const teacherController = require("./controllers/teacher.controller")
const classesController = require("./controllers/classes.controller")

const { register , login} = require("./controllers/auth.controllers")


const path = require('path');
const express = require('express');



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.use("/api/register" , body("name").isAlpha().bail().isLength({min:3 , max:50}),
body("email").isEmail().custom(async value =>{
  const admin = await Admin.findOne({email:value});
  if(admin){
   throw new Error("Check Email Or Password")
  } 
  return true;
 
 
}),body("password")
.isLength({ min: 6, max: 20 }).bail()

,

async (req ,res , next) => {
    try{
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
        next()

    }catch(err){
       return res.status(500).send({ message: err.message });
    }
  
} , register )




app.use("/api/login"  ,body("email").custom(async value =>{
  const admin = await Admin.findOne({email:value});
  if(!admin){
   throw new Error("Check Email Or Password")
  } 
  return true;
 
 
}),body("password")
.isLength({ min: 6, max: 20 }).bail()

,
async (req ,res ,next ) => {
    try{
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
     next()
       
     
    }catch(err){
       return res.status(500).send({ message: err.message });
    }}, login )

    app.use("/api/teacher" , teacherController )
    app.use("/api/classes" ,  classesController)

app.listen(process.env.PORT||3001 , async () => {
    try {
      await connect();
      console.log("port 7171");
    } catch (err) {
      console.log(err.message);
    }
  });