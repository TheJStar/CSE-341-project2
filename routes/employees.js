const router = require("express").Router();
const controller = require('../controllers/employees');
const { saveEmployee } = require("../middleware/validate");

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", saveEmployee, controller.createEmployee);

router.put("/:id", saveEmployee, controller.updateEmployee);

router.delete("/:id", controller.deleteEmployee);

module.exports = router;