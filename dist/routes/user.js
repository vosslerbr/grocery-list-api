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
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// get a user by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO don't return password
        const user = yield User_1.default.findById(req.params.id);
        res.json({ message: `Successfully fetched user with id ${req.params.id}`, record: user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to fetch user', err });
    }
}));
// create a new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const user = new User_1.default({
            email,
            password,
            name,
        });
        yield user.save();
        res.json({ message: `Successfully created user with id ${user._id}`, record: user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to create user', err });
    }
}));
exports.default = router;
