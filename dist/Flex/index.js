"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Flex;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const utils_1 = require("./utils");
__exportStar(require("./types"), exports);
function Flex(props) {
    const layout = (0, utils_1.getLayout)(props);
    const direction = (0, utils_1.getDirection)(props);
    const { layout: _, center: __, children, col, row, ...restProps } = props;
    return ((0, jsx_runtime_1.jsx)(material_1.Stack, { direction: direction, ...layout, ...restProps, children: children }));
}
