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
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("../models/Category"));
const List_1 = __importDefault(require("../models/List"));
const router = express_1.default.Router();
// get a list by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield List_1.default.findById(req.params.id).populate({
            path: 'categories',
            populate: { path: 'items' },
        });
        res.json({ message: `Successfully fetched list with id ${req.params.id}`, record: list });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to fetch list', err });
    }
}));
// add a category to a list
router.post('/:id/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new Category_1.default({
            title: req.body.title,
            items: [],
        });
        category.save();
        yield List_1.default.findByIdAndUpdate(req.params.id, { $push: { categories: category._id } }, { new: true });
        res.json({
            message: `Successfully created category with id ${category._id}`,
            record: category,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to add category to list', err });
    }
}));
// create a new list
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { owner, title } = req.body;
        const list = new List_1.default({
            owner,
            title,
            categories: [],
        });
        yield list.save();
        res.json({ message: `Successfully created new list "${title}"`, record: list });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to create list', err });
    }
}));
// update a list
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { owner, title } = req.body;
        const list = yield List_1.default.findByIdAndUpdate(req.params.id, { owner, title }, { new: true });
        res.json({ message: `Successfully updated list "${title}"`, record: list });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to update list', err });
    }
}));
// delete a list
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO how can we also delete all categories and items associated with this list?
        const list = yield List_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: `Successfully deleted list with id ${req.params.id}`, record: list });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to delete list', err });
    }
}));
// delete a category from a list
router.delete('/:listId/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO how can we also delete all items associated with this category?
        // delete the category
        const category = yield Category_1.default.findByIdAndDelete(req.params.id);
        // remove category from list
        yield List_1.default.findByIdAndUpdate(req.params.listId, { $pull: { categories: req.params.id } }, { new: true });
        res.json({
            message: `Successfully deleted category with id ${req.params.id}`,
            record: category,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to delete category', err });
    }
}));
exports.default = router;
