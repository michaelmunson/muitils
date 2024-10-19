"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Input_1 = require("../Input");
const utils_1 = require("./utils");
const dayjs_1 = __importDefault(require("dayjs"));
const dateInput = (config, props) => {
    const { value = "", validate, } = config;
    return (0, utils_1.customInput)({ value, validate }, ({ value, setValue }) => ((0, jsx_runtime_1.jsx)(Input_1.DateInput, { minDate: (0, dayjs_1.default)(), ...props, value: value ? (0, dayjs_1.default)(value) : undefined, onChange: (v) => setValue(v.toISOString()) })));
};
exports.dateInput = dateInput;
