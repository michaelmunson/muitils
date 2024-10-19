"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInput = DateInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const dayjs_1 = __importDefault(require("dayjs"));
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const AdapterDayjs_1 = require("@mui/x-date-pickers/AdapterDayjs");
const DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
const sx_1 = require("../sx");
const sx = (0, sx_1.createSx)({});
const DateInputSx = sx({
    width: '100%'
});
function DateInput(props) {
    const { value, sx: _sx, ...rest } = props;
    const dayjsValue = (['string', 'number'].includes(typeof value) || value instanceof Date) ? (0, dayjs_1.default)(value) : value;
    return ((0, jsx_runtime_1.jsx)(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDayjs_1.AdapterDayjs, children: (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { sx: sx(DateInputSx, _sx), value: dayjsValue, ...rest }) }));
}
