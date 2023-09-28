const { Double } = require("mongodb");
const mongoose= require("mongoose");
const OrderSchema= new mongoose.Schema({
    _id:{
        type: String
    },
    customerid:{
        type:String
    },
    orderdate:{
        type:String
    },
    productid:{
        type:String
    },
    productname:{
        type:String
    },
    productpicture:{
        type:String
    },
    quantity:[{
        
            variant: {
              type: String,
              required: true,
            },
            size: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          
    }],
    recivername:{
        type:String
    },
    recivercontact:{
        type:String
    },
    recivercity:{
        type:String
    },
    address:{
        type:String
    },
    orderstatus:{
        type:String
    },
    paymentmethod:{
        type:String
    },
    totalcharges:{
        type:Number
    },
    trackingid:{
        type:String
    },
    ordercancleby:{
        type:String
        // Admin
        // customer
    },
    Ordercanclereason:{
        type:String
    }



})
const OrderModel= mongoose.model('orders',OrderSchema);
module.exports=OrderModel;