import { AutocompleteProps, FormControlProps, SelectProps, TextFieldProps } from "@mui/material";
import { InputExtension } from "../types";
import { DateInputProps } from "../../Input";

export type TextFormInput<T = any> = Omit<TextFieldProps, "onChange"> & InputExtension<T> & {
  label: string;
  ['::type']: "TEXT_INPUT";
}

export type DateFormInput = Omit<DateInputProps, "onChange"> & InputExtension<string> & {
  label: string;
  ['::type']: "DATE_INPUT";
}

export type AutocompleteFormInput = Partial<Omit<AutocompleteProps<any, any, any, any>, "onChange">> & InputExtension<string> & {
  label: string;
}

export type SelectFormInput = Omit<SelectProps, "onChange"> & InputExtension<string> & {
  label: string;
  options: {value:string, label:string}[];
  FormControlProps?:FormControlProps;
}

export type CustomFormInput<T = any, P extends {} = {}> = [
  config: InputExtension<T>, 
  element:(inputs:(P & {
    value:T,
    setValue:(value:T) => void,
    isValid: boolean,
  })) => JSX.Element
];
