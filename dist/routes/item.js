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
const Item_1 = __importDefault(require("../models/Item"));
const router = express_1.default.Router();
// update an item
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, quantity, checked } = req.body;
        const item = yield Item_1.default.findByIdAndUpdate(req.params.id, { name, quantity, checked }, { new: true });
        res.json({ message: `Successfully updated category "${name}"`, record: item });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to update list', err });
    }
}));
exports.default = router;
