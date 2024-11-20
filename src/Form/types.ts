import { ColProps } from "../Flex";
import { TextFormInput, CustomFormInput } from "./inputs";

export type InputExtension<T> = {
  value: T;
  errorText?: string;
  validate?: (value:T) => boolean;
  transform?: (value:any) => T;
}

export type InputPropsExtension<T> = { setValue: (value: T) => T; isValidate: boolean };

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
