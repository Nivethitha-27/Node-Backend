const mongoose = require("mongoose");



const updateuserSchema = mongoose.Schema({
  username: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },

});



module.exports = mongoose.model("updateuser", updateuserSchema);