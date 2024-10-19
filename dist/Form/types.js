"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormInput = isFormInput;
exports.isCustomInput = isCustomInput;
exports.isFormInputRecord = isFormInputRecord;
function isFormInput(props) {
    return !isCustomInput(props) && "label" in props && typeof props.label === "string";
}
function isCustomInput(props) {
    return Array.isArray(props);
}
function isFormInputRecord(props) {
    return !isFormInput(props) && !isCustomInput(props);
}
