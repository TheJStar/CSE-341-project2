const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "my Api",
        description: "Great Api"
    },
    host: "localhost:3000",
    schemes: ["http", "https"]
}

const outputFile = "./swagger.json";
const endpoint = ["./routes/index.js"];

swaggerAutogen(outputFile, endpoint, doc);