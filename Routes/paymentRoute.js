const uuid = require("uuid");
const route = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")("sk_test_51LUy9mSHMIw7a9qsk68PLfvChxPjS9ZI65OMypnFSeCJQLGzUx10U6plgaKzxwfjWhJG5NdIgErlxKgXg5QVudwj00eutdmuxy");

route.post("/", (req, res) => {

    const { train, token } = req.body;
    console.log("train", train);
    console.log("price", train.price);
    const idempontencyKey = uuid()

    return stripe.passengers.create({
        email: token.email,
        source: token.id
    }).then(passenger => {
        stripe.charges.create({
            amount: train.price,
            currency: "INR",
            passenger: passenger.id,
            receipt_email: token.email,
            description: `${trainname_id}`
        }, { idempontencyKey })

    })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
})

module.exports = route;