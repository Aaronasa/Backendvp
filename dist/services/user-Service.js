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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client"); // Import Prisma Client
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../Error/response-error");
const prisma = new client_1.PrismaClient();
class UserService {
    // Create a new user
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                    roleId: 2,
                },
            });
            return newUser;
        });
    }
    // Read all users
    readAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({
                include: { role: true, reviews: true }, // Include relations
            });
            return users;
        });
    }
    // Read a user by ID (for logged-in user)
    readUserByToken(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user by email
            const user = yield prisma.user.findUnique({
                where: { email },
                include: { role: true, reviews: true }, // Include relations if needed
            });
            // Check if the user exists and if the token matches
            if (user && user.token === token) {
                return user; // Return the user if token matches
            }
            return null; // If no user or token doesn't match, return null
        });
    }
    // Update a user
    updateUser(userId, username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure that the email is unique
            const existingUser = yield prisma.user.findUnique({
                where: { email },
            });
            if (existingUser && existingUser.id !== userId) {
                throw new response_error_1.ResponseError(400, "Email is already taken.");
            }
            // Update the user in the database
            const updatedUser = yield prisma.user.update({
                where: { id: userId },
                data: { username, email },
            });
            return updatedUser;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                include: { role: true, reviews: true }, // Include any related data
            });
            return user;
        });
    }
    // Delete a user
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield prisma.user.delete({
                where: { id: userId },
            });
            return deletedUser;
        });
    }
    // Login a user
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "Invalid email or password");
            }
            const newToken = this.generateToken(32);
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new response_error_1.ResponseError(400, "Invalid email or password");
            }
            user.token = newToken;
            yield prisma.user.update({
                where: { id: user.id },
                data: { token: newToken },
            });
            console.log(`User ${email} logged in. Token: ${user.token}`); // Log token
            return user;
        });
    }
    // Logout a user
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({
                where: { id: userId },
                data: { token: "" }, // Clear the token
            });
            return "Logged out successfully";
        });
    }
    generateToken(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newtoken = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newtoken += characters[randomIndex];
        }
        return newtoken;
    }
}
exports.UserService = UserService;
