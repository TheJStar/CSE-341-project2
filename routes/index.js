const router = require("express").Router();
const controller = require("../controllers"); 

router.use("/", require("./swagger"))

router.use("/contacts", require("./contacts"))

router.use("/employees", require("./employees"))

router.get("/", (req, res) => {
    //#swagger.tags=[Hello World!]
    res.send("Hello World!");
});

module.exports = router;