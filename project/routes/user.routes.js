const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// Xem danh sách người dùng (Admin và Mod)
router.get("/", auth, role(["admin", "mod"]), userController.getAll);

// Đổi mật khẩu cho người dùng hiện tại
router.post("/change-password", auth, userController.changePassword);

// Cập nhật người dùng (Chỉ Admin)
router.put("/:id", auth, role(["admin"]), userController.update);

// Xóa người dùng (Chỉ Admin)
router.delete("/:id", auth, role(["admin"]), userController.delete);

module.exports = router;