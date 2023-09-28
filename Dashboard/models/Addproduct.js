const mongoose=require("mongoose")
const ProductSchema= new mongoose.Schema({
    _id:{
        type:String,
        require: true,
        uppercase:true
    
    },
title:{
    type:String,
    require: true,

},

price:{
    type:Number,
    require:true
},
discountprice:{
    type:Number,
},
brandname:{
    type:String,
    uppercase:true
},

status:{
    type:String,
    uppercase:true
    // live draft inactive
},

availability:{
    type:Boolean,
    default:true
},
lastupdate:{
    type:String
},
discription:{
    type:String,
    require:true
},
warrenty:{
    type:String
},
insidebox:{
    type:String 
},

varient:{
    type:[{
        type : String
    }]
},
sizes:{
    type:[{
        type : String
    }]
},
videourl:{
    type:String
},
images:{
    type:[{
        type : String, required: true,
    }]
},
deliverycharges:{
    type:Number,
    require:true
}
})
const ProductModel=mongoose.model('products',ProductSchema);
module.exports= ProductModel;
