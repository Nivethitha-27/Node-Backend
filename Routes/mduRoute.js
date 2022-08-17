const route = require("express").Router();
const mdu = require("../Models/mduschema");


route.post("/", async (req, res) => {
    try {
      const mdudata = new mdu({
        trainnumber: req.body.trainnumber,
        trainname: req.body.trainname,
        from: req.body.from,
        to: req.body.to,
        arrivaltime: req.body.arrivaltime,
        depaturetime: req.body.depaturetime,
        price: req.body.price,
        routes: req.body.routes,
      
  
      });
      let data = await mdudata.save();
      res.json(data);
  
    } catch (err) {
      res.status(500).send("error");
    }
  
  })

  module.exports = route;