
const mongoose=require("mongoose");
const Schemas= new mongoose.Schema({
  _id:{
    type:String,
  require:true,
lowercase:true},

  name:{
        type:String,
        require : true,
        uppercase:true
    },
    
  password:{
    type:String,
    require:true
  },
  phoneno:{
    type:String
  },
  billingaddress:{
    type:String
  }
})
const UserModel=mongoose.model('customers',Schemas);
module.exports=UserModel;
