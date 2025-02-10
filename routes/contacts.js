const router = require("express").Router();
const controller = require("../controllers/contacts");
const {saveContact,
    // expres-validator
    userValidator,
    validate,
} = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate")

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", isAuthenticated, saveContact, controller.createContact);

router.put("/:id", isAuthenticated, saveContact, controller.updateContact);

router.delete("/:id", controller.deleteContact);

module.exports = router;