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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationModifier = exports.form = exports.customInput = exports.textInput = void 0;
exports.default = Form;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Col_1 = __importDefault(require("../Flex/Col"));
const types_1 = require("./types");
const material_1 = require("@mui/material");
const Row_1 = __importDefault(require("../Flex/Row"));
const sx_1 = require("../sx");
const utils_1 = require("./utils");
Object.defineProperty(exports, "textInput", { enumerable: true, get: function () { return utils_1.textInput; } });
Object.defineProperty(exports, "customInput", { enumerable: true, get: function () { return utils_1.customInput; } });
Object.defineProperty(exports, "form", { enumerable: true, get: function () { return utils_1.form; } });
Object.defineProperty(exports, "validationModifier", { enumerable: true, get: function () { return utils_1.validationModifier; } });
const Button_1 = __importDefault(require("../Button"));
__exportStar(require("./helpers"), exports);
const sx = (0, sx_1.createSx)({});
function CustomInput(props) {
    const { input, ...args } = props;
    return input({ ...args });
}
function TextInput(props) {
    const { validate: _validate, transform, setValue, isValidate, helperText: _helperText, errorText, value, ...rest } = props;
    const validate = _validate ?? utils_1.defaultValidate;
    const [isValid, setIsValid] = (0, react_1.useState)(validate(value));
    const handleValidate = (value) => {
        setIsValid(validate(value));
    };
    const helperText = (() => {
        if (isValidate)
            return (isValid ? "" : (errorText ?? `${props.label} cannot be empty`));
        return _helperText ?? "";
    })();
    return ((0, jsx_runtime_1.jsx)(material_1.TextField, { ...rest, error: isValidate && !isValid, helperText: helperText, value: value, onChange: e => {
            const rawInput = e.target.value;
            const value = transform ? transform(rawInput) : rawInput;
            handleValidate(value);
            setValue(value);
        } }));
}
const STYLES = sx({
    '& .form-input-row': {
        width: '100%',
        gap: 2
    }
});
function Form(props) {
    const { inputs, onSubmit, onChange, sx: _sx, ...rest } = props;
    const [formInputResult, setFormInputResult] = (0, react_1.useState)((0, utils_1.deriveInitialFormInputGroupResult)(inputs));
    const [isValidate, setIsValidate] = (0, react_1.useState)(false);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (onChange)
            onChange(formInputResult);
    }, [formInputResult]);
    const handleSetInputResult = (result, key, value) => {
        const newResult = { ...result };
        if (key.length === 1)
            newResult[key[0]] = value;
        else
            newResult[key[0]][key[1]] = value;
        setFormInputResult(newResult);
    };
    const handleCanSubmit = () => {
        setIsValidate(true);
        return (0, utils_1.validateForm)({ inputs, result: formInputResult });
    };
    const handleSubmit = async () => {
        if (!handleCanSubmit())
            return;
        setIsSubmitting(true);
        await onSubmit(formInputResult);
        setIsSubmitting(false);
    };
    const GenericFormInput = (0, react_1.useCallback)(function ({ keys, props, result }) {
        const value = keys.length === 1 ? result[keys[0]] : result[keys[0]][keys[1]];
        if ((0, types_1.isFormInput)(props)) {
            return (0, jsx_runtime_1.jsx)(TextInput, { ...props, value: value, setValue: v => handleSetInputResult(result, keys, v), isValidate: isValidate });
        }
        else if ((0, types_1.isCustomInput)(props)) {
            const [{ validate = utils_1.defaultValidate }, input] = props;
            return ((0, jsx_runtime_1.jsx)(CustomInput, { input: input, value: value, setValue: v => handleSetInputResult(result, keys, v), isValid: !isValidate || (isValidate && validate(value)) }));
        }
        throw new TypeError(`Incorrect props input for GenericFormInput "${keys.join('/')}"`);
    }, [isValidate]);
    return ((0, jsx_runtime_1.jsxs)(Col_1.default, { gap: 3, sx: sx(STYLES, _sx), ...rest, children: [Object.entries(inputs).map((entry, index) => {
                const [key, value] = entry;
                if ((0, types_1.isFormInput)(value) || (0, types_1.isCustomInput)(value))
                    return ((0, jsx_runtime_1.jsx)(GenericFormInput, { keys: [key], props: value, result: formInputResult }, `form-input-${index}`));
                else if ((0, types_1.isFormInputRecord)(value))
                    return ((0, jsx_runtime_1.jsx)(Row_1.default, { className: `form-input-row`, children: Object.entries(value).map((entry2, index2) => {
                            const [key2, value2] = entry2;
                            return ((0, jsx_runtime_1.jsx)(GenericFormInput, { keys: [key, key2], props: value2, result: formInputResult }, `form-input-${index}-${index2}`));
                        }) }, `form-input-row-${index}`));
                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
            }), (0, jsx_runtime_1.jsx)(Row_1.default, { center: 'x', children: (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", color: "success", onClick: handleSubmit, sx: { borderRadius: '20px', width: '200px', fontWeight: 'bold', fontSize: '1.1rem', mt: 2 }, loading: isSubmitting, loadingText: "Submitting", children: "Submit" }) })] }));
}
