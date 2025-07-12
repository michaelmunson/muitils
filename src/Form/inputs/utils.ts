import { FormInputGroup } from "../types";
import AutocompleteInput from "./components/AutocompleteInput";
import DateInput from "./components/DateInput";
import SelectInput from "./components/SelectInput";
import { TextFormInput, CustomFormInput, DateFormInput, AutocompleteFormInput, SelectFormInput } from "./types";


/**
 * @description Specifies a text input
 * @example 
 * ```tsx
 * text('First Name', {validate:v=>v.length>0, placeholder:'Enter your first name'})
 * ```
*/ 
export const text = (label:string, props?:Partial<TextFormInput<string>>) : TextFormInput<string> => ({
  ['::type']:"TEXT_INPUT",
  label,
  value:'',
  ...props,
});

/**
 * @description Specifies a number input
 * @example 
 * ```tsx
 * number('Age', {validate:v=>v>=18, input:{min: 18}})
 * ```
*/ 
export const number = (label:string, props?:Partial<TextFormInput<number>>) : TextFormInput<number> => ({
  ['::type']:"TEXT_INPUT",
  label,
  value: 0,
  type: 'number',
  transform: v=>Number(v),
  ...props,
});

/**
 * @description Specifies a custom input
 * @example 
 * ```tsx
 * custom({label:'My Custom Input', value:'', ...props}, ({value, setValue, isValid}) => (
 *   <input type="text" value={value} onChange={e=>setValue(e.target.value)} />
 * ))
 * ```
*/ 
export const custom = <V, P extends object = object>(config:CustomFormInput<V, P>[0], renderer:CustomFormInput<V, P>[1]) : CustomFormInput<V, P> => [config, renderer];

/**
 * @description Specifies a date input
 * @example 
 * ```tsx
 * date('Birthday', {minDate: new Date(1900, 0, 1).toISOString(), maxDate: new Date(2024, 11, 20).toISOString()})
 * ```
*/ 
export const date = (label:string, props?:Partial<DateFormInput>) => custom<string, DateFormInput>({label, value:'', ...props}, DateInput);

/**
 * @description Specifies an autocomplete input
 * @example 
 * ```tsx
 * autocomplete('Pet Fish', {options:['Goldfish', 'Tropical Fish', 'Catfish'].map(v=>({value:v, label:v}))})
 * ```
*/ 
export const autocomplete = <T>(label:string, props:Omit<AutocompleteFormInput<T>, 'label'>) => custom<T, AutocompleteFormInput<T>>({label, ...props}, AutocompleteInput);

/**
 * @description Specifies a select input
 * @example 
 * ```tsx
 * select('Gender', {options:['Male', 'Female', 'Other'].map(v=>({value:v, label:v}))})
 * ```
*/ 
export const select = (label:string, props?:Partial<SelectFormInput>) => custom<string, SelectFormInput>({label, value:'', options:[], ...props}, SelectInput);

/**
 * @description allows creation of a form outside of the Form component
 * @example 
 * ```tsx
 * const myForm = form({
 *   firstName: text('First Name', {validate:v=>v.length>0, placeholder:'Enter your first name'}),
 *   lastName: text('Last Name', {validate:v=>v.length>0, placeholder:'Enter your last name'}),
 * });
 * 
 * return <Form inputs={myForm} onSubmit={v=>{
 *   console.log(v.firstName); // string
 *   console.log(v.lastName); // string
 * }}/>
 * ```
 */
export const form = <T extends FormInputGroup>(inputs:T) : T => inputs;

/* CHECKERS */
export const isDateInput = (input:any) : input is DateFormInput => input?.['::type'] === "DATE_INPUT";
export const isTextInput = (input:any) : input is TextFormInput => input?.['::type'] === "TEXT_INPUT";
export const isAutocompleteInput = (input:any) : input is AutocompleteFormInput<any> => input?.['::type'] === "AUTOCOMPLETE_INPUT";
export const isSelectInput = (input:any) : input is SelectFormInput => input?.['::type'] === "SELECT_INPUT";
export const isCustomInput = (input:any) : input is CustomFormInput => Array.isArray(input);
