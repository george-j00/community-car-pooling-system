"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const simple_auth_connection_1 = require("simple-auth-connection");
const user_router_1 = require("../adapters/routes/user.router");
const userRouterObj = new user_router_1.UserRouter();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, simple_auth_connection_1.start)(process.env.MONGODB_URI);
userRouterObj.rabbitMq();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(user_router_1.userRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
