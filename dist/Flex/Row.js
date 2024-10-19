"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Row;
const jsx_runtime_1 = require("react/jsx-runtime");
const _1 = __importDefault(require("."));
function Row(props) {
    return (0, jsx_runtime_1.jsx)(_1.default, { row: true, ...props });
}
