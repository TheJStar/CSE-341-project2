const router = require("express").Router();
const controller = require('./controllers'); 

router.use("/", require("./swagger"))

router.get("/", (req, res) => {
    //#swagger.tags=[Hello World!]
    res.send("Hello World!");
});

module.exports = router;