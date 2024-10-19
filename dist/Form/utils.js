"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationModifier = exports.customInput = exports.textInput = exports.form = void 0;
exports.deriveInitialFormInputGroupResult = deriveInitialFormInputGroupResult;
exports.getValueFromKeys = getValueFromKeys;
exports.defaultValidate = defaultValidate;
exports.validateForm = validateForm;
const types_1 = require("./types");
function deriveInitialFormInputRecordResult(group) {
    const result = {};
    for (const key in group) {
        const value = group[key];
        if ((0, types_1.isFormInput)(value)) {
            result[key] = value.value;
        }
        else if ((0, types_1.isCustomInput)(value)) {
            const [config] = value;
            result[key] = config.value;
        }
        else {
            throw new TypeError('Input not type of FormInput or CustomFormInput');
        }
    }
    return result;
}
function deriveInitialFormInputGroupResult(group) {
    let result = {};
    for (const key in group) {
        const value = group[key];
        if ((0, types_1.isFormInputRecord)(value)) {
            result[key] = deriveInitialFormInputRecordResult(value);
        }
        else {
            Object.assign(result, deriveInitialFormInputRecordResult({ [key]: value }));
        }
    }
    return result;
}
function getValueFromKeys(keys, result) {
    return keys.length === 1 ? result[keys[0]] : result[keys[0]][keys[1]];
}
function defaultValidate(value) { return !!value; }
;
function validateForm(form) {
    const { inputs, result } = form;
    for (const key in inputs) {
        const value = inputs[key];
        if ((0, types_1.isFormInput)(value)) {
            const validate = value.validate ? value.validate : (v) => !!v;
            if (!validate(result[key]))
                return false;
        }
        else if ((0, types_1.isCustomInput)(value)) {
            const [config] = value;
            const validate = config.validate ?? defaultValidate;
            if (!validate(result[key]))
                return false;
        }
        else {
            if (!validateForm({ inputs: value, result: result[key] }))
                return false;
        }
    }
    return true;
}
/* helpful */
/*** INPUT HELPERS  */
const form = (inputs) => inputs;
exports.form = form;
const textInput = (label, props) => ({ label, value: "", ...props });
exports.textInput = textInput;
/*** CUSTOM INPUT HELPERS */
const customInput = (config, renderer) => [config, renderer];
exports.customInput = customInput;
const validationModifier = (isValid, errorText) => {
    if (!isValid)
        return { error: true, helperText: errorText };
};
exports.validationModifier = validationModifier;
