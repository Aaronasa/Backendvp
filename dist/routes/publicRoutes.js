"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_Controller_1 = require("../controller/user-Controller");
const router = (0, express_1.Router)();
// Public Route: Create User
router.post("/create", user_Controller_1.UserController.createUser);
// Public Route: Read User (can be with query params to fetch specific user)
// router.get("/read", UserController.readUser);
router.post("/login", user_Controller_1.UserController.login);
exports.default = router;
