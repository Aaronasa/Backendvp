"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_Service_1 = require("../services/user-Service");
class UserController {
    // Create User
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield new user_Service_1.UserService().createUser(request);
                res.status(201).json({
                    message: "User successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "An error occurred while creating the user." });
            }
        });
    }
    // Read all users
    static readAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new user_Service_1.UserService().readAllUsers();
                res.status(200).json({
                    message: "Users successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "An error occurred while retrieving users." });
            }
        });
    }
    // userController.ts
    static readUserByToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // `req.user` is populated by `authMiddleware`
                const user = req.user;
                if (!user) {
                    console.error("User not found in the request.");
                    res.status(403).json({ error: "You are not authorized to access this resource." });
                    return;
                }
                // Validate the email matches the authenticated user
                const email = req.body.email;
                if (!email || email !== user.email) {
                    console.error("Email does not match the authenticated user.");
                    res.status(400).json({ error: "Invalid email address." });
                    return;
                }
                // Respond with user data
                res.status(200).json({
                    message: "User successfully retrieved.",
                    data: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        token: user.token,
                    },
                });
            }
            catch (error) {
                console.error("Error in readUserByToken:", error);
                res.status(500).json({ error: "An error occurred while retrieving the user." });
            }
        });
    }
    // Login User
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield new user_Service_1.UserService().login(email, password);
                res.status(200).json({
                    message: "Login successful.",
                    data: response,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    res
                        .status(401)
                        .json({ error: error.message || "Invalid email or password." });
                }
                else {
                    console.error("Unexpected error:", error);
                    res.status(500).json({ error: "An unexpected error occurred." });
                }
            }
        });
    }
    // Logout User
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (userId === undefined) {
                    res.status(400).json({ error: "User is not authenticated." });
                    return;
                }
                const response = yield new user_Service_1.UserService().logout(userId);
                res.status(200).json({
                    message: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while logging out." });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(403).json({ error: "You are not authorized to delete this user." });
                    return;
                }
                const userService = new user_Service_1.UserService();
                // Call the service to delete the user
                const deletedUser = yield userService.deleteUser(userId);
                res.status(200).json({
                    message: "User deleted successfully.",
                    data: deletedUser,
                });
            }
            catch (error) {
                console.error("Error in deleteUser:", error);
                res.status(500).json({ error: "An error occurred while deleting the user." });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(400).json({ error: "User is not authenticated." });
                    return;
                }
                const { username, email } = req.body;
                if (!username || !email) {
                    res.status(400).json({ error: "Username and email are required." });
                    return;
                }
                // Call service to update the user
                const updatedUser = yield new user_Service_1.UserService().updateUser(userId, username, email);
                res.status(200).json({
                    message: "User updated successfully.",
                    data: updatedUser,
                });
            }
            catch (error) {
                console.error("Error in updateUser:", error);
                res.status(500).json({ error: "An error occurred while updating the user." });
            }
        });
    }
}
exports.UserController = UserController;
