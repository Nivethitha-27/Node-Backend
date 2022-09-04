const jwt = require("jsonwebtoken");
const atoken = require("../Models/adminschema");
const utoken = require("../Models/userschema");

async function Tokenverification(req, res, next) {
    req.user = null
    try {
        if (req.headers && req.headers.authorization) {
            const [_, token] = req.headers.authorization.split(" ");
            const user = await jwt.verify(token, process.env.LOGIN);
            if (user.role === "admin") {
                const admin = await atoken.findOne({ email: user.email })
                if (admin) {
                    console.log("admin")
                    req.user = user
                    next();
                }
            }
            else if (user.role === "user") {
                const users = await utoken.findOne({ email: user.email })
                if (users) {
                    console.log("user")
                    req.user = users
                    next();
                }
            }
            else {
                throw new Error("User doesn't exists")
            }
        }
        else {
            res.status(403).send("log in")
        }

    } catch (err) {
        res.status(403).send(err.message);
    }
}


module.exports = Tokenverification