"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const app_1 = __importDefault(require("./application/app"));
app_1.default.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});

// const logging_1 = require("./application/logging");
// app_1.default.listen(3000, '0.0.0.0',() => {
//     logging_1.Logger.info('Server is running on port 3000');
// });
