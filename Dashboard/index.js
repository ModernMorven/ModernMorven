const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

const port = 8000
require("./DataBase/Connection");

const app = express();
app.use(express.json());


const cors = require("cors");
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "https://www.modernmorven.com");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept, application/json');
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "https://185.201.9.59");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, application/json');
  next();
});



const corsOptions = {
  origin: [ "https://modernmorven.com","https://www.modernmorven.com","https://www.media.modernmorven.com","https://modernmorven.com", "https://185.201.9.59"],
};


app.use(cors(corsOptions)); // Use this middleware to handle CORS
app.options("*", cors(corsOptions));


// app.use(express.static(path.join(__dirname, '../modernmorven/build')));
// app.get('*', (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, '../modernmorven/build', 'index.html'));
//   } catch (error) {
//     console.error('Error serving index.html:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// AES desryption algorithm add hash algorithm
const decryptAndHashPassword = (encryptedPassword, secretKey) => {
  // Decrypt the password
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

  // Hash the decrypted password
  const saltRounds = 10; // Adjust according to your needs
  const hashedPassword = bcrypt.hashSync(decryptedPassword, saltRounds);

  return hashedPassword;
};
// Forlogin user password only decrypt from this function 
const decryptPassword = (encryptedPassword, secretKey) => {
  // Decrypt the password
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
};

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&




const UserModel = require("./models/Signup");

app.post('/customersignup', async(req, res) => {
  try{
    const userdata= req.body.mail;
    const find= await UserModel.findOne({_id:userdata});
    if (find){
      res.status(404).send({message:"User already exist "})
    }
    else{

      const encryptedPasswordFromClient = req.body.passhash; // Receive this from the client
      const secretKey = 'MM*995MoDeRN#tEc';
      const hashedPassword = decryptAndHashPassword(encryptedPasswordFromClient, secretKey);
     const response=new UserModel({_id:req.body.mail,name:req.body.name,password:hashedPassword});
     const data= await response.save();
     if(data){
      res.status(200).send(data); // Replace this with your desired response
     }
     else{
      res.status(404).send({message:"ERROR WHILE POSTING"})
     }
    
    }
  }
  catch(error){
    res.status(500).send({message:`Error While Fetching ${error}`});
  }

});

app.post('/customerlogin', async (req, res) => {
  try {
    if (req.body._id && req.body.password) {

      const encryptedPasswordFromClient = req.body.password; // Receive this from the client
      const secretKey = 'MM*995MoDeRN#tEc';
      const decryptPasswordFromFunction = decryptPassword(encryptedPasswordFromClient, secretKey);


      const plainPasswordFromClient = decryptPasswordFromFunction; // Receive this from the client

      // Fetch user from the database based on _id
      const user = await UserModel.findById(req.body._id).select('+password');

      if (user) {
        // Compare the received plain password with the stored hashed password
        const passwordMatches = bcrypt.compareSync(plainPasswordFromClient, user.password);

        if (passwordMatches) {
          res.send({success:user});
        } else {
          res.status(500).send({failure:'Incorrect password'});
        }
      } else {
        res.status(500).send({failure:'No Data Found'});
      }
    }
  } catch (error) {
    res.status(404).send({failure:'MISSING FIELDS'});
  }
});



const Adminlogin=require("./models/Adminlogin")

app.use(express.json());

const ProductModel = require("./models/Addproduct");

const storage = multer.diskStorage({
  destination: '../media/ProductData/', // Change this to your desired destination
  filename: (req, file, cb) => {
    // Generate a unique filename for each image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `image-${uniqueSuffix}.${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });



  app.get("/draftproduct",async(req,res)=>{
    try{
       const manageproduct= await ProductModel.find({
        status: "DRAFT"
       });
       if(manageproduct.length>0){
        res.send(manageproduct)
       }
       else{
        res.send({result : "NO Result FOUND"})
       }
    }
    catch(error){
      res.send(`Error In Fetching Data ${error}`)
    }
  })




 
   app.get("/mainarticle",async(req,res)=>{
    try{
         const Mainproduct= await ProductModel.find({
          status:"LIVE"
         })
         if(Mainproduct.length>0){
          res.send(Mainproduct);
         }
         else{
          res.send({result:"NO DATA FOUND "})
         }

    }
    catch(error){
      res.send(`ERROR IN FETCH API ${error}` )
    }
   })


app.post("/majorproduct", async (req, res) => {
  try {
    const key = req.body.mykey;
    const Mainproduct = await ProductModel.findOne(
     {_id: key}
    );

    if (Mainproduct) {
      res.status(200).send(Mainproduct);
    } else {
      res.status(404).send({ result: "NO DATA FOUND" });
    }
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});


// customer Add to cart 
const CartModel=require("./models/AddtoCart");
app.post("/customercart", async(req,res)=>{
  try{
    const response=  new CartModel({
      customerid:req.body.customerid,
     productid:req.body.productid,
    producttitle:req.body.producttitle,
   productpicture:req.body.productpicture,
   productprice:req.body.productprice,
productquantity:req.body.productquantity

    });
   const result= await response.save();
    if(result){
      res.status(201).json({ message: "Item added to cart successfully." });
    }
  
  }
  catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
})
// count items in cart of user 
app.post("/api/searchcart", async (req, res) => {
  try {
    
    const maincount = await CartModel.countDocuments({ customerid: req.body.key });
   
    res.send(maincount.toString());
    
    
    // Convert the count to a string before sending
    
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});
app.post("/api/cartitems", async (req, res) => {
  try {
    
    const response = await CartModel.find({ customerid: req.body.key });
   if(response.length>0){
    res.status(201).send(response);
   }
   else{
    res.status(404).send({result:"NO Data found "});
   }
    
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});
app.post("/apicartremove", async (req, res) => {
  try {
    const productIdToRemove = req.body.key; // Assuming 'key' contains the product _id

    // Use Mongoose to find and delete the document by _id
    const response = await CartModel.deleteOne({ _id: productIdToRemove });

    if (response) {
      // Document with the specified _id was successfully removed
      res.status(200).send({ message: "Item removed successfully" });
    } else {
      // No matching document found for the given _id
      res.status(404).send({ result: "No data found for the given key" });
    }
  } catch (error) {
    // Handle other errors (e.g., database connection issues)
    res.status(500).send({ error: `Error in the API: ${error.message}` });
  }
});


const OrderModel=require("./models/ManageOrder");

app.post("/ordermanagement",async(req,res)=>{
try{
  const currentTimestamp = Date.now();
  const randomValue1 = Math.round(Math.random() * 1E1);
  const randomValue2 = Math.round(Math.random() * 1E1).toString().padStart(2, '0'); // Ensure it's 4 digits long
  
  const uniqueSuffix = `PKM${currentTimestamp}${randomValue1}M${randomValue2}`;
  const response= new OrderModel({
    _id:uniqueSuffix,
    customerid:req.body.customerid,
    orderdate:req.body.orderdate,
  productid:req.body.productid,
  productname:req.body.productname,
  productpicture:req.body.productpicture,
  quantity: req.body.quantity,
  recivername:req.body.recivername,
  recivercontact:req.body.recivercontact,
  recivercity:req.body.recivercity,
  address:req.body.address,
  orderstatus: req.body.orderstatus,
  paymentmethod:req.body.paymentmethod,
  totalcharges:req.body.totalcharges,
  });

  const result= await response.save();
  if(result){
    res.status(201).json({ message: "Item added to cart successfully." });
  }

}
catch (error) {
  res.status(500).json({ error: "An error occurred while processing your request." });
}
})
app.post("/ordercount", async (req, res) => {
  try {
    
    const maincount = await OrderModel.countDocuments({productid: req.body.key });
   
    res.send(maincount.toString());
    
    
    // Convert the count to a string before sending
    
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});
const RatingModel=require('./models/Rating')

app.post("/averagerating", async (req, res) => {
  try {
    const productid = req.body.key;

    // Calculate the average rating using aggregation and round it to 2 decimal places
    const result = await RatingModel.aggregate([
      { $match: { productid } }, // Match documents with the specified product ID
      {
        $group: {
          _id: "$productid", // Group by productid
          averageRating: { $avg: "$rating" }, // Calculate the average rating
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the result
          averageRating: { $round: ["$averageRating", 1] }, // Round off averageRating to 2 decimal places
        },
      },
    ]);

    // Extract the averageRating from the result (if it exists)
    const averageRating = result[0] ? result[0].averageRating : 0.0;

    res.send(averageRating.toString());
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});

app.post("/orderhistory", async (req, res) => {
  try {
    const customerId = req.body.key;
    
    const pipeline = [
      // Match documents that match the customer ID
      {
        $match: {
          customerid: customerId,
        },
      },
      // Group documents by a field (e.g., "_id") or any other criteria you need
      
      // Sort the grouped results in ascending order
      {
        $sort: {
          orderdate: -1, // 1 for ascending, -1 for descending
        },
      },
    ];

    const response = await OrderModel.aggregate(pipeline);

    if (response.length > 0) {
      res.status(201).send(response);
    } else {
      res.status(404).send({ result: "No Data found" });
    }
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});



app.post("/detailorderhistory", async (req, res) => {
  try {
    
    const response = await OrderModel.findOne({_id: req.body.key });
   if(response){
    res.status(201).send(response);
   }
   else{
    res.status(404).send({result:"NO Data found "});
   }
    
    
    // Convert the count to a string before sending
    
  } catch (error) {
    res.status(500).send({ error: `ERROR IN FETCH API ${error}` });
  }
});



app.post("/customerreviews", async (req, res) => {
  try {
    
    const maincount = await RatingModel.find({productid: req.body.key });
   if(maincount.length>0){
    res.send(maincount);
   }
   else{
    res.status(200).send({result:"No data Found"});
   }
     
    // Convert the count to a string before sending
    
  } catch (error) {
    res.status(500).send({result:"ERROR IN FETCHING "});
  }
});

// this API will check the Reviews found if not then on OrderHistory force user to give a Feedback of purchase 
app.post("/customerCheckFeedback", async (req, res) => {
  try {
    const maincount = await RatingModel.findOne({
      orderid: req.body.key });
   if(maincount){
    res.send(true);
   }
   else{
    res.send({result:"No Data Found"});
   }
     
    // Convert the count to a string before sending
    
  } catch (error) {
    res.status(500).send({result:"ERROR IN FETCHING "});
  }
});


// This Api For Taking Feedback for product 

app.post("/customerrating", async (req,res)=>{
  try{
    const response= new RatingModel({
      orderid:req.body.orderid,
      productid:req.body.productid,
      userid:req.body.userid,
      username:req.body.username,
      date:req.body.date,
      rating:req.body.rating,
      message:req.body.message,
      });
   const result= await response.save();
    if(result){
      res.status(201).json({ message: "Item added to cart successfully." });
    }
    else{
      res.status(404).json({ message: "Item added to cart successfully." });

    }
  
  }
  catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
})
app.post("/CustomerShowProfile",async(req,res)=>{
  try{
      const response= await UserModel.findOne({_id:req.body.key});
      if(response){
         res.status(201).send(response);
        }
      else{
          res.status(404).send({message:"ERROR While Updating"})
       }
    
  }
  catch(error){
    res.status(500).send({message:`ERROR IN API ${error}`})
  }
})
app.post("/CustomerEditProfile",async(req,res)=>{
  try{
      const response= await UserModel.findOne({_id:req.body.key});
      if(response){
          response.name=req.body.name,
          response.phoneno=req.body.phoneno,
          response.billingaddress=req.body.billingaddress;
         const result=await response.save();
        if(result){
          const data= await result.save();
          res.status(201).send(data);
        }
        else{
          res.status(404).send({message:"ERROR While Updating"})
        }
      }
      else{
        res.status(404).send({message:"No Data Found"})
      }
  }
  catch(error){
    res.status(500).send({message:`ERROR IN API ${error}`})
  }
})
app.post("/CMAIL/SENDOTP", async (req, res) => {
  try {
    const email = req.body.key;
    const code = req.body.value;
    const usersearch= await UserModel.findOne({_id:email});
    if(usersearch){
    // Assuming ResetEmail is your sendPasswordResetEmail function
    const response = await sendPasswordResetEmail(email, code);
    if (response.result) {
      // If the response has a "result" property, it means the email was sent successfully.
      res.status(200).send({ result: "Email sent successfully" });
    } else {
      // If there's no "result" property in the response, there was an error.
      // Send an error response.
      res.status(500).send({ message: "Error sending email" });
    }

  }
  else{
    res.status(404).send({message:"NO DATA FOUND"})
  }
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error in API:", error);
    res.status(500).send({ message: `Internal API error ${error}` });
  }
});

app.post("/CMAIL/FIND/updatepassword",async(req,res)=>{
  try {
    const response= await UserModel.findOne({_id:req.body.key});
    if(response){
       response.password=req.body.value;
       const data=await response.save();
      res.status(200).send(data);
    }
    else{
      res.status(404).send({message:"NO DATA FOUND"})
    }
  } catch (error) {
    res.status(500).send({message:"ERROR IN API"})
  }
})




// ****************************************************************************************************************************************
// ****************************************************************************************************************************************
                            // Admin Pannel        
// ****************************************************************************************************************************************
// ****************************************************************************************************************************************





app.post("/AdminLogin", async(req,res)=>{
  
  
  if(req.body._id && req.body.password){
      let login= await Adminlogin.findOne({
        _id: req.body._id,
        password:req.body.password,
        enable:true
       
  }).select('-password')
  if(login){
    res.send(login)
  }
  else{
    res.send("invalid credentials")
  }
  }
  else{
    // tutorial videono# 14 logout feature added into system
    res.errored("Missing Fields")
  }

})


app.post("/Addproduct", upload.array("images"), async (req, res) => {

  try{
    const search= await ProductModel.findOne({
      _id: req.body._id
    })
    if(search){
      res.status(200).send({verification :"ERROR"})
    }
  else{
    let videourl;
    const imageUrls = req.files.map(file => `https://www.media.modernmorven.com/ProductData/${file.filename}`);
    for (let i = 0; i < imageUrls.length; i++) {
      if (imageUrls[i].endsWith(".mp4")) {
       videourl=imageUrls[i];
       imageUrls.splice(i,1);
      }
  }
  
    const product = new ProductModel({
       _id:req.body._id,
       title: req.body.title,
       price: req.body.price,
       discountprice: req.body.discountprice,
       brandname: req.body.brandname,
       status: req.body.status,
       availability: req.body.availability,
       lastupdate: req.body.lastupdate,
       discription: req.body.discription,
       warrenty: req.body.warrenty,
       insidebox: req.body.insidebox,
       varient: req.body.varient.split(','),
       sizes: req.body.sizes.split(','),
       videourl:videourl,
       images: imageUrls,
       deliverycharges: req.body.deliverycharges,
   
  });
  
   const data = await product.save();
     res.status(200).send({success:"TRUE"})
  }
  }
    catch(error){
      res.status(500).send({message:`Error from backend ${error}`})
    }
  });
  
  //********************************************************************************************************************* */
  
  
  
  // this section for manage Product on Admin Side 
    app.get("/manageproduct",async(req,res)=>{
      try{
         const manageproduct= await ProductModel.find({
          status: { $in: ["LIVE", "INACTIVE"] }
          // status:"MINE"
         });
         if(manageproduct.length>0){
          res.send(manageproduct)
         }
         else{
          res.send({result : "NO Result FOUND"})
         }
       
      }
      catch(error){
        res.send(`Error In Fetching Data ${error}`)
      }
    })
app.post("/orderCancelReason", async (req, res) => {
  try {
    const orderId = req.body.key; // Use a more descriptive variable name
    const response = await OrderModel.findOne({_id:orderId});
    if (response) {
      // Correct the typo in the property name
      response.orderstatus = req.body.orderstatus;
      response.ordercancleby = req.body.ordercancleby;
      response.Ordercanclereason= req.body.orderCancelReason; // Fix the typo here

      // Save the updated order data
      const updatedOrder = await response.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ result: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request.", details: error.message }); // Include a more informative error message
  }
});
app.post("/orderTracking", async (req, res) => {
  try {
    const orderId = req.body.key; // Use a more descriptive variable name
    const response = await OrderModel.findOne({_id:orderId});
    if (response) {
      // Correct the typo in the property name
      response.orderstatus = req.body.orderstatus;
      response.trackingid = req.body.ordertracking;
      const updatedOrder = await response.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ result: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request.", details: error.message }); // Include a more informative error message
  }
});


app.post("/updateavailability", async(req,res)=>{
  try{
    const response= await ProductModel.findOne({_id:req.body.key});
   
    if(response){
      response.availability= req.body.status;
      const result= await response.save();
      res.status(200).json(result);
    }
    else{
      res.status(404).json({ result: "ERROR WHILE UPDATING" });

    }
  
  }
  catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
})
app.post("/updateStatus", async(req,res)=>{
  try{
    const response= await ProductModel.findOne({_id:req.body.key});
   
    if(response){
      response.status= req.body.status;
      const result= await response.save();
      res.status(200).json(result);
    }
    else{
      res.status(404).json({ result: "ERROR WHILE UPDATING" });

    }
  
  }
  catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
})
app.post("/deleteProduct", async (req, res) => {
  try {
    const productIdToRemove = req.body.key; // Assuming 'key' contains the product _id

    // Use Mongoose to find and delete the document by _id
    const response = await ProductModel.deleteOne({ _id: productIdToRemove });

    if (response) {
      // Document with the specified _id was successfully removed
      res.status(200).send({ message: "Item removed successfully" });
    } else {
      // No matching document found for the given _id
      res.status(404).send({ result: "No data found for the given key" });
    }
  } catch (error) {
    // Handle other errors (e.g., database connection issues)
    res.status(500).send({ error: `Error in the API: ${error.message}` });
  }
});

app.post("/api/v2/orders",async(req,res)=>{
  try{
   
      const Mainproduct= await OrderModel.find({orderstatus:req.body.key})
      if(Mainproduct.length>0){
       res.send(Mainproduct);
      }
      else{
       res.send({result:"NO DATA FOUND "})
      }

  }
  catch(error){
    res.send(`ERROR IN FETCH API ${error}` )
  }
 })

 app.post("/orderdelivered", async (req, res) => {
  try {
    const orderId = req.body.key; // Use a more descriptive variable name
    const response = await OrderModel.findOne({_id:orderId});
    if (response) {
      // Correct the typo in the property name
      response.orderstatus = req.body.orderstatus;
      const updatedOrder = await response.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ result: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request.", details: error.message }); // Include a more informative error message
  }
});

app.get("/api/viewall/orders",async(req,res)=>{
  try{
   
      const Mainproduct= await OrderModel.find().sort({ orderdate: -1 })
      if(Mainproduct.length>0){
       res.send(Mainproduct);
      }
      else{
       res.send({result:"NO DATA FOUND "})
      }
  }
  catch(error){
    res.send(`ERROR IN FETCH API ${error}` )
  }
 })

 const InventoryModel= require("./models/Addinventory")

 app.post("/Addinventory", upload.array("images"), async (req, res) => {

  try{
    let videourl;
    const imageUrls = req.files.map(file => `https://www.media.modernmorven.com/ProductData/${file.filename}`);
    for (let i = 0; i < imageUrls.length; i++) {
      if (imageUrls[i].endsWith(".mp4")) {
       videourl=imageUrls[i];
       imageUrls.splice(i,1);
      }
  }
    const Inventory = new InventoryModel({
      inventorytitle:req.body.inventorytitle,
      producttitle:req.body.producttitle,
      productprice:req.body.productprice,
      grandtotal:req.body.grandtotal,
      shipmentcost:req.body.shipmentcost,
      brandname:req.body.brandname,
      lastupdate:req.body.lastupdate,
      otherinfo:req.body.otherinfo,
      varient: req.body.varient.split(','),
      sizes: req.body.sizes.split(','),
      videourl:videourl,
      images: imageUrls,
      totalitems:req.body.totalitems,
  });
  
 
   const data = await Inventory.save();
   res.status(200).json({ success: true, message: "Inventory added successfully", data });
  
  }
    catch(error){
      console.error(error);
      res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
  });
app.get("/showInventory",async(req,res)=>{
  try{
      const response= await InventoryModel.find();
      if(response.length>0){
        res.status(200).send(response)
      }
      else{
        res.send({result:"No Data Found"})
      }
  }
  catch(error){
    res.status(500).send({error:"ERROR WHILE FETCHING"})
  }
});
const AdsSchema= new mongoose.Schema({
  adsimageUrl:{
    type:String
  }
})
const AdsModel= new mongoose.model("adsimages",AdsSchema);
app.post("/AdsManage",upload.single("image"),async(req,res)=>{
  try{
  const response= new AdsModel({
    adsimageUrl:`https://www.media.modernmorven.com/ProductData/${req.file.filename}`
  })
  const data=await  response.save();
  if(response){
  res.status(200).send(data)
  }
  else{
    res.status(404).send({result:"Error while Uploarding"})
  }
  }
  catch(error){
    res.status(500).send({error:`ERROR ${error}`})
  }
})

app.get("/api/runningads",async(req,res)=>{
  try{
    const response= await AdsModel.find();
    if(response){
      res.send(response);
    }
    else{
      res.send({result:"ERROR while Fetching"})
    }

  }
  catch(error){
    res.status.send(`ERROR ${error}`)
  }
})
app.post("/api/delete/ads",async(req,res)=>{
  try{
    const response= await AdsModel.deleteOne({_id:req.body.key});
    if(response){
      res.send(response);
    }
    else{
      res.send({result:"ERROR while Fetching"})
    }

  }
  catch(error){
    res.status.send(`ERROR ${error}`)
  }
})


const sendPasswordResetEmail=require("./models/EmailSender");
// for admin forget password;
app.post("/Admin/SEND/TOKEN",async(req,res)=>{
  try {
    const email = req.body.key;
    const code = req.body.value;
    const usersearch= await Adminlogin.findOne({_id:email});
    if(usersearch){
    // Assuming ResetEmail is your sendPasswordResetEmail function
    const response = await sendPasswordResetEmail(email, code);
    if (response.result) {
      // If the response has a "result" property, it means the email was sent successfully.
      res.status(200).send({ result: "Email sent successfully" });
    } else {
      // If there's no "result" property in the response, there was an error.
      // Send an error response.
      res.status(500).send({ message: "Error sending email" });
    }

  }
  else{
    res.status(404).send({message:"NO DATA FOUND"})
  }
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error in API:", error);
    res.status(500).send({ message: `Internal API error ${error}` });
  }
});
app.post("/Admin/SUBMIT/ADD/ADMIN",async(req,res)=>{
  try {
    const response= await Adminlogin.findOne({_id:req.body.key});
    if(response){
      res.status(404).send({message:"Admin Already Exists"});
    }
    else{
      let data=new Adminlogin({
        _id:req.body.key,
        name:req.body.name,
        password:req.body.pass,
        Role:req.body.role,
        enable:req.body.enable

      })
      await data.save();
      res.status(200).send(data)
    }
  } catch (error) {
    res.status(500).send({message:"ERROR IN API while Add Admin"})
  }
})
app.post("/Admin/SEND/UPDATE",async(req,res)=>{
  try {
    const response= await Adminlogin.findOne({_id:req.body.key});
    if(response){
       response.password=req.body.value;
       const data=await response.save();
      res.status(200).send(data);
    }
    else{
      res.status(404).send({message:"NO DATA FOUND"})
    }
  } catch (error) {
    res.status(500).send({message:"ERROR IN API"})
  }
})

app.get('/api/fetch/admins',async(req,res)=>{
  try {
    const response= await Adminlogin.find();
    if(response.length>0){
      res.status(200).send(response);
    }else{
      res.status(404).send({message:"No data Found"});
    }
    
  } catch (error) {
    res.status(500).send({message:"ERROR IN API"})
  }
})
app.post('/apisingle/admins',async(req,res)=>{
  try {
    const response= await Adminlogin.findOne({_id:req.body.key});
    if(response){
      res.status(200).send(response);
    }else{
      // res.status(404).send({message:"No data Found"});
      res.status(404).send({message:"No Data Found"});
    }
    
  } catch (error) {
    res.status(500).send({message:"ERROR IN API"})
  }
})
app.post("/Admin/SEND/Edit/profile",async(req,res)=>{
  try {
    const response= await Adminlogin.findOne({_id:req.body.key});
    if(response){
       response.name=req.body.name;
       response.Role=req.body.role;
       response.enable=req.body.enable;
       const data=await response.save();
      res.status(200).send(data);
    }
    else{
      res.status(404).send({message:"NO DATA FOUND"})
    }
  } catch (error) {
    res.status(500).send({message:"ERROR IN API "})
  }
})
app.post("/Admin/Access/Add/remove",async(req,res)=>{
  try {
    const response= await Adminlogin.findOne({_id:req.body.key});
    if(response){
       response.enable=req.body.enable;
       const data=await response.save();
      res.status(200).send(data);
    }
    else{
      res.status(404).send({message:"NO DATA FOUND"})
    }
  } catch (error) {
    res.status(500).send({message:"ERROR IN API"})
  }

})
app.post("/Admin/Access/delete",async(req,res)=>{
  try {
    const response= await Adminlogin.deleteOne({_id:req.body.key});
    if(response){
      res.status(200).send({result:"Delete Successfully"});
    }
    else{
      res.status(404).send({message:"NO DATA FOUND"})
    }
  } catch (error) {
    res.status(500).send({message:"ERROR IN API"})
  }

})
// total customers
app.get("/admin/main/showcustomers",async(req,res)=>{
try {
  const response= await UserModel.countDocuments();
  if(response){
    const data= response.toString();
    res.status(200).send(data);
  }
  else{
    res.status(404).send({message:"NO DATA FOUND"})
  }
} catch (error) {
  res.status(500).send({message:"ERROR IN API count docs"})
}
})
app.get("/admin/main/showOrders",async(req,res)=>{
try {
  const response= await OrderModel.countDocuments();
  if(response){
    const data= response.toString();
    res.status(200).send(data);
  }
  else{
    res.status(404).send({message:"NO DATA FOUND"})
  }
} catch (error) {
  res.status(500).send({message:"ERROR IN API count docs"})
}
})
app.get("/admin/main/showReviews",async(req,res)=>{
try {
  const response= await RatingModel.countDocuments();
  if(response){
    const data= response.toString();
    res.status(200).send(data);
  }
  else{
    res.status(404).send({message:"NO DATA FOUND"})
  }
} catch (error) {
  res.status(500).send({message:"ERROR IN API count docs"})
}
})
app.get("/admin/main/showRevenue",async(req,res)=>{
  try {
    // Query the database to fetch orders
    const orders = await OrderModel.find();
   if(orders){
    const revenue = orders.reduce((totalRevenue, order) => {
      return totalRevenue + order.totalcharges;
    }, 0);
    const data= revenue.toString();
    res.status(200).send(data);
  }
  else{
    res.status(404).send({message:"NO DATA FOUND"})
  }
} catch (error) {
  res.status(500).send({message:"ERROR IN API count docs"})
}
})

app.post("/api/draft/search",async(req,res)=>{
  try {
    const response= await ProductModel.findOne({_id:req.body.key});
    if(response){
      res.status(200).send(response);
    }
    else{
      res.status(404).send({message:"NO data Found"});
    }
  } catch (error) {
    res.status(500).send({message:`Error in APi ${error}`});
  }
  
})
app.post("/api/draft/Edit",upload.array('images'),async(req,res)=>{
  try{
    const search= await ProductModel.findOne({
      _id: req.body._id
    })
    if(search){
    let videourl;
    let imageUrls;
    if (req.files && req.files.length > 0){
    imageUrls = req.files.map(file => `https://www.media.modernmorven.com/ProductData/${file.filename}`);
    for (let i = 0; i < imageUrls.length; i++) {
      if (imageUrls[i].endsWith(".mp4")) {
       videourl=imageUrls[i];
       imageUrls.splice(i,1);
      }
     }
    
    }
  
       search.title= req.body.title,
       search.price= req.body.price,
       search.discountprice= req.body.discountprice,
       search.brandname= req.body.brandname,
       search.status= req.body.status,
   
       search.lastupdate= req.body.lastupdate,
       search.discription= req.body.discription,
       search.warrenty= req.body.warrenty,
       search.insidebox= req.body.insidebox,
       search.varient= req.body.varient.split(','),
       search.sizes= req.body.sizes.split(',');
       if(videourl){
        search.videourl=videourl
       }
       if(imageUrls){
        search.images= imageUrls
       }
      
       search.deliverycharges= req.body.deliverycharges;
   
    const data =await search.save();
     res.status(200).send({success:"Update Product Successfully"})
  }
  else{
    res.status(404).send({message:"else condition error"})
  }

  }
    catch(error){
      res.status(500).send({message:`backendapi  ${error}`})
    }
})

app.post('/api/edit/product/delete/videourl', async (req, res) => {
  try {
    // Find the product document by its _id
    const response = await ProductModel.findOne({_id:req.body.key});

    if (response) {
      response.videourl=undefined;
      const data= await response.save();
     res.status(200).send({ result: "Delete video Successfully" });
    
    }
    else{
    res.status(404).send({ message: "video not found" });
    }
     
  } catch (error) {
    res.status(500).send({ message: `ERROR while deleting video: ${error}` });
  }
});


app.post('/api/edit/product/delete/images', async (req, res) => {
  try {
    // Find the product document by its _id
    const product = await ProductModel.findOne({ _id: req.body.key });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Delete the image at the specified index
    const indexToDelete = req.body.index;
    if (indexToDelete >= 0 && indexToDelete < product.images.length) {
      // Remove the image address and shift remaining addresses
      product.images.splice(indexToDelete, 1);

      // Remove null addresses from the images array
      product.images = product.images.filter(image => image !== null);

      // Rearrange the remaining images by updating the index property
      product.images.forEach((image, index) => {
        image.index = index;
      });

      await product.save();

      res.status(200).send({ result: "Delete Successfully" });
    } else {
      return res.status(400).send({ message: "Invalid index" });
    }
  } catch (error) {
    res.status(500).send({ message: `ERROR while updating images: ${error}` });
  }
});






















app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
