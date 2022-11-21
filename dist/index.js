"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./helpers/connectDB"));
const list_1 = __importDefault(require("./routes/list"));
const category_1 = __importDefault(require("./routes/category"));
const item_1 = __importDefault(require("./routes/item"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
(0, connectDB_1.default)();
app.use('/user', user_1.default);
app.use('/list', list_1.default);
app.use('/category', category_1.default);
app.use('/item', item_1.default);
app.get('/', (req, res) => {
    res.send('Grocery List API');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
