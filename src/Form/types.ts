import { type TextFieldProps } from "@mui/material"
import { type ColProps } from "../Flex";

export type InputExtension<T> = {
  value: T;
  errorText?: string;
  validate?: (value:T) => boolean;
  transform?: (value:any) => T;
}

export type TextFormInput<T = any> = Omit<TextFieldProps, "onChange"> & InputExtension<T> & {
  label: string;
}

export type CustomFormInput<T = any> = [
  config: InputExtension<T>, 
  element:(inputs:({
    value:T,
    setValue:(value:T) => void,
    isValid: boolean,
  })) => JSX.Element
];

export type FormInputRecord = {
  [key:string] : TextFormInput | CustomFormInput
}

export type FormInputGroup = Omit<{
  [key:string] : TextFormInput | CustomFormInput | FormInputRecord
}, "label"|"value">

export type FormInputRecordResult<T> = (
  T extends FormInputRecord ? {
    [K in keyof T] : (
      T[K] extends TextFormInput<infer V> ? V 
      : T[K] extends CustomFormInput<infer V> ? V : never
    )
  } : never
);

export type FormResult<T> = (
  T extends FormInputGroup ? {
    [K in keyof T]: (
      T[K] extends TextFormInput<infer V> ? V 
      : T[K] extends CustomFormInput<infer V> ? V : (
        T[K] extends FormInputRecord ? FormInputRecordResult<T[K]> : never
      )
    )
  } : never
)

export type FormProps<T extends FormInputGroup> = Omit<ColProps, "onSubmit"|"onChange"> & {
  inputs: T;
  onSubmit: (result: FormResult<T>) => Promise<void>;
  onChange?: (result: FormResult<T>) => void;
}

export function isFormInput<T>(props:any) : props is TextFormInput<T> {
  return !isCustomInput(props) && "label" in props && typeof props.label === "string";
}

export function isCustomInput<T>(props:any) : props is CustomFormInput<T> {
  return Array.isArray(props);
}

export function isFormInputRecord(props:any) : props is FormInputRecord {
  return !isFormInput(props) && !isCustomInput(props);
}
