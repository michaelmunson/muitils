import dayjs from "dayjs";
import { DateInput as DateInputComponent, DateInputProps } from "../../../Input";
import { InputPropsExtension } from "../../types";
import { PickerValue } from "@mui/x-date-pickers/internals";


export default function DateInput(props:DateInputProps & Omit<InputPropsExtension<string>, 'isValidate'>){
  const { validate, setValue, ...rest } = props;
  return (
    <DateInputComponent 
      {...rest}
      value={props.value ? dayjs(props.value) : undefined} 
      onChange={(v:PickerValue) => {
        setValue(v?.toISOString() ?? '')
        if (validate) validate(v?.toISOString() ?? '')
      }}
    />
  )
}
