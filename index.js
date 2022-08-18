const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const trainRoute = require("./Routes/trainRoute");
const passengerRoute = require("./Routes/passengerRoute");
const paymentRoute = require("./Routes/paymentRoute");
const authRoute = require("./Routes/authRoute");
const adminRoute = require("./Routes/adminRoute");
const cors = require("cors");
const port = process.env.PORT || 5000;
// const port = 5000;



// middleware

app.use(express.json());

app.get("/", (req, res) =>
  res.send(`Server Running`)
);


app.use(cors());

// db

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true, })
  .then(() => console.log("DB Connected..!"))

  .catch(err => console.log(err))

// app.listen(process.env.PORT || 5000, () => console.log("server started"));






// Route

app.use("/", authRoute);     //register,login

app.use("/user", userRoute);  // user

app.use("/train", trainRoute);   // train

app.use("/admin", adminRoute);   // admin

app.use("/passenger", passengerRoute); //passenger

app.use("/payment", paymentRoute); //payment


app.listen(port, () => console.log("server started"));




