const mongoose=require("mongoose");
const CartSchema = mongoose.Schema({
    customerid:{
        type:String
    },
    productid:{
        type:String
    },
    producttitle:{
        type:String
    },
    productpicture:{
        type:String
    },
    productprice:{
        type:Number
    },
    productquantity:{
        type:Number
    }

});
const CartModel=mongoose.model('addtocarts',CartSchema);
module.exports=CartModel;