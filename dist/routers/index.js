"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = __importDefault(require("./producto"));
const carrito_1 = __importDefault(require("./carrito"));
const router = express_1.Router();
router.use('/productos', producto_1.default);
router.use('/carrito', carrito_1.default);
exports.default = router;
