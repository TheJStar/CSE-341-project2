const express = require("express");
const routes = require("./routes");
const {
    logError,
    isOperationalError
} = require("./middleware/errorHandler")

const app = express();

const bodyParser = require("body-parser");
const mongodb = require("./db");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-key");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use("/", routes);

process.on('unhandledRejection', error => {
    throw error
})

process.on('uncaughtException', error => {
    logError(error)
   
    if (!isOperationalError(error)) {
        process.exit(1)
    }
})

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Db connected and Listening on port :${port}`)
        })
    }
});

