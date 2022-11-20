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
// delete a category
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO how can we also delete all items associated with this category, and remove any refs to this Category?
        const category = yield Category_1.default.findByIdAndDelete(req.params.id);
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
