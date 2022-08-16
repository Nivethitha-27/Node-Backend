const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const trainRoute = require("./Routes/trainRoute");
const passengerRoute = require("./Routes/passengerRoute");
const paymentRoute = require("./Routes/paymentRoute");

const authRoute = require("./Routes/authRoute");


const cors = require("cors");

const port = 5000;

// middleware

app.use(express.json());
app.use(cors());

// db

mongoose
  .connect("mongodb://localhost:27017/userdetails", {

    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected..!"))

  .catch(err => console.log(err))

app.listen(port, () => console.log("server started"));


// Route

app.use("/", authRoute);     //register,login

app.use("/user", userRoute);  // user

app.use("/train", trainRoute);   // train

app.use("/passenger", passengerRoute); //passenger

app.use("/payment", paymentRoute); //payment







