const mongoose = require("mongoose");

const passengerdetailsSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  username:{ type: String, required:true},
  email: { type: String, required: true },
  passengerdata: { type: Object, required: true },
  traindata: { type: Object, required: true },
  Totalfare:{ type:Number, required:true},
});

module.exports = mongoose.model("passengerdetails", passengerdetailsSchema);