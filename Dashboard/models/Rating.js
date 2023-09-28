const mongoose= require("mongoose");
const ratingSchema= new mongoose.Schema({
    orderid:{
        type:String
    },
    productid:{
        type:String
    },
    userid:{
        type:String
    },
    username:{
        type:String
    },
    date:{
        type:String
    },
    rating:{
        type:Number
    },
    message:{
        type:String
    },

})
const RatingModel= mongoose.model('ratings',ratingSchema);
module.exports=RatingModel;