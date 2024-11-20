import { FormInputGroup } from "../types";
import AutocompleteInput from "./components/AutocompleteInput";
import SelectInput from "./components/SelectInput";
import { TextFormInput, CustomFormInput, DateFormInput, AutocompleteFormInput, SelectFormInput } from "./types";

export const text = (label:string, props?:Partial<TextFormInput<string>>) : TextFormInput<string> => ({
  ['::type']:"TEXT_INPUT",
  label,
  value:'',
  ...props,
});

export const number = (label:string, props?:Partial<TextFormInput<number>>) : TextFormInput<number> => ({
  ['::type']:"TEXT_INPUT",
  label,
  value:0,
  ...props,
});

export const custom = <V, P extends {} = {}>(config:CustomFormInput<V, P>[0], renderer:CustomFormInput<V, P>[1]) : CustomFormInput<V, P> => [config, renderer];

export const date = (label:string, props?:Partial<DateFormInput>) : DateFormInput => ({
  ['::type']:"DATE_INPUT",
  label,
  value:'',
  ...props,
});

export const autocomplete = (label:string, props?:Partial<AutocompleteFormInput>) => custom<string, AutocompleteFormInput>({label, value:'', ...props}, AutocompleteInput);

export const select = (label:string, props?:Partial<SelectFormInput>) => custom<string, SelectFormInput>({label, value:'', options:[], ...props}, SelectInput);

export const form = <T extends FormInputGroup>(inputs:T) : T => inputs
/* CHECKERS */
export const isDateInput = (input:any) : input is DateFormInput => input?.['::type'] === "DATE_INPUT";
export const isTextInput = (input:any) : input is TextFormInput => input?.['::type'] === "TEXT_INPUT";
export const isAutocompleteInput = (input:any) : input is AutocompleteFormInput => input?.['::type'] === "AUTOCOMPLETE_INPUT";
export const isSelectInput = (input:any) : input is SelectFormInput => input?.['::type'] === "SELECT_INPUT";
export const isCustomInput = (input:any) : input is CustomFormInput => Array.isArray(input);
