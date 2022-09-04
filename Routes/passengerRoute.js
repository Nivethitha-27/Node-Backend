const route = require("express").Router();
const passenger = require("../Models/passengerschema");
const nodemailer = require("nodemailer");
const sendgridtransport = require("nodemailer-sendgrid-transport")
require("dotenv").config();

//mail

let transporter = nodemailer.createTransport({
  host: 'mail.gmail.com',
  port: 587,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
})

route.post("/mail", async (req, res) => {
  const { email, TrainName, TrainNumber, Depaturetime, Arrivaltime, Coach, Berth, From, To, Totalfare } = req.body;
  console.log(email);
  let mailOptions = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Your Booking Details",
    html: `<div className="email" style="
        font-family: sans-serif;
        font-size: 15px;
        ">
        <h3 style='color:red'>HappyJourney!!!</h3>
        <p>
        <h4 style='color:green'>TrainName:${TrainName}</h4>
        <h4 style='color:green'>TrainNumber:${TrainNumber}</h4>
        <h4 style='color:green'>Depaturetime:${Depaturetime}</h4>
        <h4 style='color:green'>Arrivaltime:${Arrivaltime}</h4>
        <h4 style='color:green'>Coach:${Coach}</h4>
        <h4 style='color:green'>Berth:${Berth}</h4>
        <h4 style='color:green'>From:${From} </h4>
         <h4 style='color:green'>To:${To}</h4>
         <h4 style='color:green'>Amount:Rs.${Totalfare}</h4>
    </p>
  </div>`


  };

  await transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      res.json({ status: "Email not sent" });
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
})


//passenger

route.post("/", async (req, res) => {

  try {
    const passengerdata = new passenger({
      userid: req.user._id,
      username: req.user.username,
      email: req.user.email,
      passengerdata: req.body.passengerdata,
      traindata: req.body.traindata,
      Totalfare: req.body.Totalfare,
    });
    let data = await passengerdata.save();
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

route.get("/userid/user", async (req, res) => {
  try {
    const data = await passenger.find({ userid: req.user._id });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }

});

// delete by id

route.delete("/:id", async (req, res) => {
  try {
    await passenger.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");

  } catch (error) {
    res.status(500).json(error);

  }
});


module.exports = route;