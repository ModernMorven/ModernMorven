const mongoose=require("mongoose")
const AdminSchema=mongoose.Schema({
    _id :{
        type:String,
        lowercase:true,
        required:[true,"Please provide an email"]
    },
    name:{
        type:String
    },
    password:{
        type:String,
        minlength:6,
        requie:true
    },
    Role:{
        type:String,
        tolowercase:true
    },
    enable:{
        type:Boolean,
    }
})
const AdminModel=mongoose.model("admins",AdminSchema)
module.exports=AdminModel;
