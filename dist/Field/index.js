"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Field;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Flex_1 = __importDefault(require("../Flex"));
const sx_1 = require("../sx");
const sx = (0, sx_1.createSx)({
    classes: ['field', 'value'],
});
const FieldSx = sx({
    p: 0,
    [sx._cls('field')]: {
        pr: 1
    }
});
function Field(props) {
    const { label, value, sx: _sx, ...rest } = props;
    return ((0, jsx_runtime_1.jsxs)(Flex_1.default, { row: true, sx: sx(FieldSx, _sx), ...rest, children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { className: sx.classes.field, children: [(0, jsx_runtime_1.jsx)("b", { children: label }), ":"] }), !value ? ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { width: '200px' })) : ((0, jsx_runtime_1.jsx)(material_1.Typography, { className: "value", children: value }))] }));
}
