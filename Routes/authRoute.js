const route = require("express").Router();
const jwt = require("jsonwebtoken")
const db = require("../Models/userschema");
const bcrypt = require("bcrypt")
require("dotenv").config();

// register

route.post("/register", async (req, res) => {
  try {
    let alreadyEmail = await db.findOne({ email: req.body.email }); //dbquery
    if (alreadyEmail) {
      return res.status(400).json("Email exist");
    }
    let pass = await bcrypt.hash(req.body.password, 10);

    const data = new db({
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      password: pass,

    });
    console.log(data)
    let user = await data.save();

    user.save()
      .then(user => {
        transporter.sendMail({
          to: user.email,
          from: "no-reply@trainexpress.com",
          subject: "signup success",
          html: "<h1>Welcome to TrainExpress</h1>"
        })

        res.status(200).json(user);
      })


  } catch (err) {
    res.status(500).send("error");
  }

});


// Login

route.post("/login", async (req, res) => {
  try {
    let user = await db.findOne({ email: req.body.email }); //dbquery
    if (!user) {
      return res.status(400).json("please register");
    }

    let passwordValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValidation) {
      return res.status(400).json("Your Password Wrong");
    }
    let accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.LOGIN);
    res.send(accessToken);

  } catch (err) {
    res.status(500).send("error");
  }
});




module.exports = route;
