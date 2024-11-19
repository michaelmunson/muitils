import { TextField } from "@mui/material";
import { InputPropsExtension } from "../../types";
import { defaultValidate } from "../../utils";
import { useState } from "react";
import { TextFormInput } from "../types";

export type TextInputProps<T> = TextFormInput<T> & InputPropsExtension<T>;

export default function TextInput<T>(props: TextInputProps<T>) {
  const { validate: _validate, transform, setValue, isValidate, helperText: _helperText, errorText, value, ...rest } = props;
  const validate = _validate ?? defaultValidate;
  const [isValid, setIsValid] = useState(validate(value));
  const handleValidate = (value: T) => {
    setIsValid(validate(value));
  }

  const helperText = (() => {
    if (isValidate) return (
      isValid ? "" : (errorText ?? `${props.label} cannot be empty`)
    )

    return _helperText ?? "";
  })()

  return (
    <TextField
      {...rest}
      error={isValidate && !isValid}
      helperText={helperText}
      value={value}
      onChange={e => {
        const rawInput = e.target.value;
        const value: T = transform ? transform(rawInput) : rawInput as T;
        handleValidate(value);
        setValue(value);
      }} />
  )
}

