const mongoose=require("mongoose")









const InventorySchema= new mongoose.Schema({
inventorytitle:{
        type:String,
        
},
 producttitle:{
    type:String,
   
},
productprice:{
    type:Number,
   
},
grandtotal:{
    type:Number,
   
},
shipmentcost:{
    type:Number,
},
brandname:{
    type:String,
    uppercase:true
},

lastupdate:{
    type:String
},
otherinfo:{
    type:String,
  
},
totalitems:{
    type:Number
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
        type : String
    }]
},
})
const InventoryModel=mongoose.model('inventories',InventorySchema);
module.exports= InventoryModel;
