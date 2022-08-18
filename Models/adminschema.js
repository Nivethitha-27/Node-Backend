const mongoose = require("mongoose");



const adminschema = new mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    isAdmin: {
        type: Boolean,
        default: true,
    },
  

},
    { timestamps: true }
);





module.exports = mongoose.model("admin", adminschema);