const mongoose = require("mongoose");
const passengerschema = require("./passengerschema");

const traindetailsSchema = mongoose.Schema({
  trainnumber: { type: String, required: true },
  trainname: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  arrivaltime: { type: String, required: true },
  depaturetime: { type: String, required: true },
  date:{ type:String,required:true},
  price: { type:Number, required: true },
  routes: { type: String, required: true },
  status :{ type:String},

});


module.exports = mongoose.model("traindetails", traindetailsSchema);