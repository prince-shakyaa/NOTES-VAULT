const express = require("express");
const { register, login, getUser } = require("../controllers/auth.controller");
const { authenticateToken } = require("../utilities/authenticateToken");

const router = express.Router();

router.post("/create-account", register);
router.post("/login", login);
router.get("/get-user", authenticateToken, getUser);

module.exports = router;
