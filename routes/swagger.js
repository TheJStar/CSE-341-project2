const router = require("express").Router();
const swaggerUiExpress = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUiExpress.serve);
router.get("/api-docs", swaggerUiExpress.setup(swaggerDocument));

module.exports = router;