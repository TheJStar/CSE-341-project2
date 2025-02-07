const router = require("express").Router();
const controller = require("../controllers/contacts");
const {saveContact,
    // expres-validator
    userValidator,
    validate,
} = require("../middleware/validate");

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", saveContact, controller.createContact);

router.put("/:id", saveContact, controller.updateContact);

router.delete("/:id", controller.deleteContact);

module.exports = router;