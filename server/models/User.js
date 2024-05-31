const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        default:0
    }
})

const QuestionSchema=new mongoose.Schema({
    question: String,
    A: String,
    B: String,
    C: String,
    D: String,
    answer: String,
    

})

const QuestionModel=mongoose.model("qs",QuestionSchema);
const UserModel=mongoose.model("users",UserSchema);
module.exports={UserModel,QuestionModel};