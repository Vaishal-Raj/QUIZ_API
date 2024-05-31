const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

const { UserModel, QuestionModel } = require('./models/User.js');

mongoose.connect("mongodb://localhost:27017/Quiz");

mongoose.connection.on("Connected",()=>console.log("connected to mongodb"));


//for Admin

app.get("/getAllUsers",async (req,res)=>{
    const result=await UserModel.find({});
    if(result)
        return res.json(result);
    return res.json({error:"No users found!!!"});
    
})
//For login
app.post("/getUser",async (req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    const result=await UserModel.findOne({email:email});
    console.log("server side :",result);
    if(result){
        if(result.password===password){
            return res.json({message : "User is valid"});
        }
        return res.json({error:"Password is incorrect!!"});   
    }
    return res.json({error:"User not found!!!"});
})


//for sign up
app.post("/addUser",async (req,res)=>{
    const {username,email,password}=req.body;
    const result=await UserModel.findOne({email:email});
    if(result){
        return res.json({error:"User already exists!!"});
    }else{
        const user = new UserModel({username:username,email:email,password:password});
        await user.save();
        return res.json({message:"New User added to collection!!"});
    }
})
c
// Quiz 
// For retrieving questions
app.get("/getQs",async (req,res)=>{
    const result=await QuestionModel.find({});
    console.log(result);
    if(result){
        return res.json(result)
    }
    return res.json({error:"Not found"});
})

//for updating score
app.put("/updateScore",async (req,res)=>{
    console.log(req.body);
    const {email,score}=req.body;
    const result=await UserModel.findOne({email:email});
    if (result){
        result.score=score;
        await result.save();
        return res.json({message:"Score updated"});
    }else{
        return res.json({error:"No such user exists!!"});
    }
})

app.listen(3001,()=>console.log("server listening on port 3001"));
