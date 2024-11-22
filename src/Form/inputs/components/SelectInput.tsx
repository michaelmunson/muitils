import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectFormInput } from "../types";
import { useId } from "react";

type SelectInputProps<T> = SelectFormInput & {
  value:T,
  setValue:(value:T) => void,
  isValid:boolean,
}

export default function SelectInput<T>({ value, setValue, label, options, ...props }:SelectInputProps<T>) {
  const randId = useId();
  const id = props.id ?? randId;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={(e) => setValue(e.target.value as T)}
        {...props}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}