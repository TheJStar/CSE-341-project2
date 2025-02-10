const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers"); 

router.use("/", require("./swagger"))

router.use("/", require("./auth"))

router.use("/contacts", require("./contacts"))

router.use("/employees", require("./employees"))

module.exports = router;