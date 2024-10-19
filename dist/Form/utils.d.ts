import { FormInputRecord, FormInputRecordResult, FormInputGroup, FormResult, TextFormInput, CustomFormInput } from "./types";
export declare function deriveInitialFormInputGroupResult<T extends FormInputGroup>(group: T): FormResult<T>;
export declare function getValueFromKeys<T>(keys: string[], result: FormResult<T>): any;
export declare function defaultValidate(value: any): boolean;
export declare function validateForm<T>(form: {
    inputs: FormInputGroup | FormInputRecord;
    result: FormResult<T> | FormInputRecordResult<T>;
}): boolean;
/*** INPUT HELPERS  */
export declare const form: <T extends FormInputGroup>(inputs: T) => T;
export declare const textInput: (label: string, props?: Partial<TextFormInput<string>>) => TextFormInput<string>;
/*** CUSTOM INPUT HELPERS */
export declare const customInput: <V>(config: CustomFormInput<V>[0], renderer: CustomFormInput<V>[1]) => CustomFormInput<V>;
export declare const validationModifier: (isValid: boolean, errorText: string) => {
    readonly error: true;
    readonly helperText: string;
} | undefined;
