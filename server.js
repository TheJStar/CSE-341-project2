const express = require("express");
const routes = require("./routes");
const {
    logError,
    isOperationalError
} = require("./middleware/errorHandler")

const app = express();

const bodyParser = require("body-parser");
const mongodb = require("./db");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 3000;

// initilizing app aka express
app.use(bodyParser.json())
    // session middleware (express-session)
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized:true
    }))
    // passport middleware
    .use(passport.initialize())
    .use(passport.session())
    // res header
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-key");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next()})
    //cors
    .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
    .use(cors({ origin: "*" }))
app.use("/", routes);

// passport
require("./helper/passport").init(passport);

// error handeling
process.on("unhandledRejection", error => {
    throw error
})

process.on("uncaughtException", error => {
    logError(error)
   
    if (!isOperationalError(error)) {
        process.exit(1)
    }
})

// connection to MongoDb and initilaizing server
mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Db connected and Listening on port :${port}`)
        })
    }
});

