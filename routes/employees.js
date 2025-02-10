const router = require("express").Router();
const controller = require("../controllers/employees");
const { saveEmployee } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate")

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", isAuthenticated, saveEmployee, controller.createEmployee);

router.put("/:id", isAuthenticated, saveEmployee, controller.updateEmployee);

router.delete("/:id", controller.deleteEmployee);

module.exports = router;