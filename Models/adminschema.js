const mongoose = require("mongoose");



const adminschema = new mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
},
   
);

module.exports = mongoose.model("admin", adminschema);