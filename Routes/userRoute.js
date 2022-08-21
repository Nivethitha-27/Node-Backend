const route = require("express").Router();
const jwt = require("jsonwebtoken")
const db = require("../Models/userschema");
const update = require("../Models/updatauserschema");
const bcrypt = require("bcrypt")


// get users

route.get("/find", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("error");
  }
});


// get users by id

route.get("/:id", async (req, res) => {

  try {
    const get = await db.findById(req.params.id);
    res.json(get);
  } catch (err) {
    res.status(500).json(err);
  }
});


//update users

// route.put("/:id", async (req, res) => {

//   if (req.body.password) {
//     req.body.password = bcrypt.hash(req.body.password, 10);
//   }
//   try {
//     const update = await update.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
//     res.status(200).json(update);

//   } catch (error) {
//     res.status(500).json(error);

//   }
// });

route.put("/:id", async (req, res) => {
  let pass = await bcrypt.hash(req.body.password, 10);
  try {
const update = await update.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
     ({
      username: req.body.username,
      mobile: req.body.mobile,
      password: pass,

    });
    // let user = await update.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("error");
  }
});

// delete users

route.delete("/:id", async (req, res) => {
  try {
    await db.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");

  } catch (error) {
    res.status(500).json(error);

  }

})


module.exports = route;
