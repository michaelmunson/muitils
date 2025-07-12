import { Autocomplete, TextField } from "@mui/material";
import { AutocompleteFormInput } from "../types";
import { validationModifier } from "../../utils";

type AutocompleteInputProps<T extends any | any[]> = AutocompleteFormInput<T> & {
  value:T,
  setValue:(value:T) => void,
  isValid:boolean,
  label:string,
}

export default function AutocompleteInput<T>({value, setValue, isValid, errorText, label, ...props}:AutocompleteInputProps<T>){
  const loading = props.loading ?? Boolean(props.options);
  const options = props.options ?? [] as any[];

  return (
    <Autocomplete
      disablePortal
      value={value as any}
      onChange={(_, v:any) => {
        if (v) setValue(v as T)
      }}
      loading={loading}
      options={options}
      getOptionLabel={(option) : string => {
        if (typeof option === 'string') return option;
        else if (typeof option === 'object' && option !== null && 'label' in option) return option.label as string;
        else return '';
      }}
      renderInput={(params: any) => (
        <TextField {...params} label={label} {...validationModifier(isValid, errorText ?? "")} />
      )}
      {...props}
    />
  )
}
