const mongoose = require("mongoose");
// const {Schema} = mongoose


const passengerdetailsSchema = new mongoose.Schema({
  
    userid: { type:String, required: true },
    passengerdata: { type:Object, required: true },
    traindata: { type:Object, required: true }
});

module.exports = mongoose.model("passengerdetails", passengerdetailsSchema);