const mongoose=require("mongoose");
const dblocation="mongodb://127.0.0.1:27017/modernmorven";
mongoose.connect(dblocation,{
  dbName: "modernmorven",
  user: "mudassar",
  pass: "MK*123karlal",
  authSource: "modernmorven",
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
 console.log("Connected to mongoDB");
}).catch((Error)=>{
    console.log('Connection Error', Error);
}) 
