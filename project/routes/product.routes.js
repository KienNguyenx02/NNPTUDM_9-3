const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/", productController.getAll);

router.post("/", auth, role(["admin","mod"]), productController.create);

router.put("/:id", auth, role(["admin","mod"]), productController.update);

router.delete("/:id", auth, role(["admin"]), productController.delete);

module.exports = router;