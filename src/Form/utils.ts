

import { FormInputRecord, FormInputRecordResult, FormInputGroup, FormResult } from "./types";
import { TextFormInput, CustomFormInput } from "./inputs";


function deriveInitialFormInputRecordResult<T extends FormInputRecord>(group:T) : FormInputRecordResult<T> {
  const result:FormInputRecordResult<T> = {} as any;
  for (const key in group){
    const value = group[key];
    if (isFormInput(value)){
      result[key] = value.value;
    }
    else if (isCustomInput(value)){
      const [config] = value;
      result[key] = config.value;
    } 
    else {
      throw new TypeError('Input not type of FormInput or CustomFormInput')
    }
  }
  return result;
}

export function isFormInput<T>(props:any) : props is TextFormInput<T> {
  return !isCustomInput(props) && "::type" in props;
}

export function isCustomInput<T>(props:any) : props is CustomFormInput<T> {
  return Array.isArray(props);
}

export function isFormInputRecord(props:any) : props is FormInputRecord {
  return !isFormInput(props) && !isCustomInput(props);
}


export function deriveInitialFormInputGroupResult<T extends FormInputGroup>(group:T) : FormResult<T> {
  let result:FormResult<T> = {} as any;
  for (const key in group){
    const value = group[key];
    if (isFormInputRecord(value)){
      result[key] = deriveInitialFormInputRecordResult(value) as any;
    }
    else {
      Object.assign(result, deriveInitialFormInputRecordResult({[key]: value}))
    }
  }

  return result;
}

export function getValueFromKeys<T>(keys:string[], result:FormResult<T>){
  return keys.length === 1 ? result[keys[0]] : (result as any)[keys[0]][keys[1]];
}

export function defaultValidate(value:any){return !!value};

export function validateForm<T>(form:{inputs:FormInputGroup | FormInputRecord, result:FormResult<T> | FormInputRecordResult<T>}) : boolean {
  const {inputs, result} = form;
  for (const key in inputs){
    const value = inputs[key];
    if (isCustomInput(value)){
      
      const [config] = value;
      const validate = config.validate ?? defaultValidate;
      if (!validate(result[key]))
        return false;
    }
    else if (isFormInput(value)){
      
      const validate = value.validate ? value.validate : defaultValidate;
      if (!validate(result[key]))
        return false;
    }
    else {
      if (!validateForm({inputs: value, result: result[key] as FormInputRecordResult<T>}))
        return false;
    }
  }

  return true;
}

export const validationModifier = (isValid:boolean, errorText:string) => {
  if (!isValid) return {error: true, helperText: errorText }
  return {};
}
