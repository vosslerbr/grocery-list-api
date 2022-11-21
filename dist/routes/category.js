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
const Item_1 = __importDefault(require("../models/Item"));
const router = express_1.default.Router();
// update a category
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const category = yield Category_1.default.findByIdAndUpdate(req.params.id, { title });
        res.json({ message: `Successfully updated category "${title}"`, record: category });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to update list', err });
    }
}));
// add an item to a category
router.post('/:id/item', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, quantity, checked } = req.body;
        const item = new Item_1.default({
            name,
            quantity,
            checked,
        });
        item.save();
        yield Category_1.default.findByIdAndUpdate(req.params.id, { $push: { items: item._id } }, { new: true });
        res.json({
            message: `Successfully created item with id ${item._id}`,
            record: item,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to add item to category', err });
    }
}));
// delete an item from a category
router.delete('/:categoryId/item/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // delete the item
        const item = yield Item_1.default.findByIdAndDelete(req.params.id);
        // remove category from list
        yield Category_1.default.findByIdAndUpdate(req.params.categoryId, { $pull: { items: req.params.id } }, { new: true });
        res.json({
            message: `Successfully deleted item with id ${req.params.id}`,
            record: item,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to delete item', err });
    }
}));
exports.default = router;
