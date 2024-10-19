"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonPopup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Icon_1 = __importDefault(require("../Icon"));
const ButtonPopup_1 = __importDefault(require("./ButtonPopup"));
exports.ButtonPopup = ButtonPopup_1.default;
function Button(props) {
    const { Icon: icon, loading, loadingText, ...rest } = props;
    if (icon && typeof icon === "string")
        return ((0, jsx_runtime_1.jsx)(Icon_1.default, { name: icon, button: rest }));
    else if (icon)
        return ((0, jsx_runtime_1.jsx)(Icon_1.default, { ...icon, button: rest }));
    return (loading ? ((0, jsx_runtime_1.jsxs)(material_1.Button, { variant: props.variant ?? "contained", ...rest, disabled: true, children: [(0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: { width: '20px !important', height: '20px !important', mr: 1 } }), loadingText ?? rest.children] })) : ((0, jsx_runtime_1.jsx)(material_1.Button, { variant: props.variant ?? "contained", ...rest })));
}
(function (Button) {
    Button.Popup = ButtonPopup_1.default;
})(Button || (Button = {}));
exports.default = Button;
