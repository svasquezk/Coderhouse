"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const puerto = process.env.PORT || 8080;
server_1.default.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
