const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "my Api",
        description: "Great Api"
    },
    host: "cse-341-project2-m1wn.onrender.com",
    schemes: ["https", "http"]
}

const outputFile = "./swagger.json";
const endpoint = ["./routes/index.js"];

swaggerAutogen(outputFile, endpoint, doc);