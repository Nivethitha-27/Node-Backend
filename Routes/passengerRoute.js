const route = require("express").Router();
const passenger = require("../Models/passengerschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


//passenger

route.post("/", async (req, res) => {

  try {
  
    const passengerdata = new passenger({
      userId: req.body.userId,
      passengerdata: req.body.passengerdata,
      traindata: req.body.traindata

    });

    let data = await passengerdata.save();
    console.log(data);
    res.json(data);

  } catch (err) {
    res.status(500).send("error");
  }

});

// get passenger details by id

route.get("/find/:id", async (req, res) => {

  try {
    const post = await passenger.findById(req.params.id);
    res.json(post);

  } catch (err) {
    res.status(500).json(err);
  }
});

// get passenger details

route.get("/find", async (req, res) => {
  try {
    const data = await passenger.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("error");
  }
});

// get all by user id

route.get("/find/:userid", async (req, res) => {
  try {
    const data = await passenger.findByUserId(req.params);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }

});

//get by userid

route.get("/userid/:userid", async (req, res) => {
  try {
    const data = await passenger.find({ userid: req.params.userid });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }

});


module.exports = route;