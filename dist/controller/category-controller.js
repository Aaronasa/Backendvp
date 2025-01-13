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
exports.CategoryController = void 0;
const category_Service_1 = require("../services/category-Service");
const category_validation_1 = require("../validation/category-validation");
class CategoryController {
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the request body
                const request = category_validation_1.CategoryValidation.CREATE.parse(req.body);
                // Proceed with service logic
                const response = yield new category_Service_1.CategoryService().createCategory(request);
                res.status(201).json({
                    message: "Category successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the category." });
            }
        });
    }
    static readCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = category_validation_1.CategoryValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });
                const response = yield new category_Service_1.CategoryService().readCategoryById(params.id);
                res.status(200).json({
                    message: "Category successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while retrieving the category.' });
            }
        });
    }
    static readAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new category_Service_1.CategoryService().readAllCategories();
                res.status(200).json({
                    message: 'All categories successfully retrieved.',
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred while retrieving categories.' });
            }
        });
    }
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = category_validation_1.CategoryValidation.UPDATE.parse(req.body);
                const response = yield new category_Service_1.CategoryService().updateCategory(request);
                res.status(200).json({
                    message: "Category successfully updated.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while updating the category.' });
            }
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = category_validation_1.CategoryValidation.DELETE.parse(req.body);
                const response = yield new category_Service_1.CategoryService().deleteCategory(request);
                res.status(200).json({
                    message: "Category successfully deleted.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while deleting the category.' });
            }
        });
    }
}
exports.CategoryController = CategoryController;
