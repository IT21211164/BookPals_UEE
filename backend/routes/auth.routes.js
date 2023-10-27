const express = require("express");
const router = express.Router();
const {
  registerUser,
  registerAdmin,
  userLogin,
  updatePreferedCategory
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.put("/change-pref-book-category/:id", updatePreferedCategory);
router.post("/register/admin", registerAdmin);
router.post("/login", userLogin);

module.exports = router;
