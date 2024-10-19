"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Col_1 = __importDefault(require("./Flex/Col"));
const sx_1 = require("./sx");
const sx = (0, sx_1.createSx)();
function Spinner({ fillContainer, ...props }) {
    const { sx: _sx, size, ...rest } = props;
    const Sx = sx(_sx, { width: size?.x ? (`${size.x}px !important`) : 'initial' }, { height: size?.y ? (`${size.y}px !important`) : 'initial' });
    if (!fillContainer)
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: Sx, ...rest });
    return ((0, jsx_runtime_1.jsx)(Col_1.default, { center: ['x', 'y'], height: '100%', width: '100%', children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: Sx, ...rest }) }));
}
