import { Autocomplete, TextField } from "@mui/material";
import { AutocompleteFormInput } from "../types";
import { validationModifier } from "../../utils";

type AutocompleteInputProps = AutocompleteFormInput & {
  value:string,
  setValue:(value:string) => void,
  isValid:boolean,
  label:string,
}

export default function AutocompleteInput({value, setValue, isValid, errorText, label, ...props}:AutocompleteInputProps){
  const loading = props.loading ?? Boolean(props.options);
  const options = props.options ?? [] as readonly {id:string, label:string}[];

  return (
    <Autocomplete
      disablePortal
      value={value}
      onChange={(_, v) => {
        if (v) setValue(v.value ? v.value : v)
      }}
      loading={loading}
      options={options}
      renderInput={(params: any) => (
        <TextField {...params} label={label} {...validationModifier(isValid, errorText ?? "")} />
      )}
      {...props}
    />
  )
}
