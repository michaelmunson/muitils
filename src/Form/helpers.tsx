import { DateInput, DateInputProps } from "../Input";
import { customInput } from "./utils";
import dayjs from "dayjs";
import { InputExtension } from "./types";

export const dateInput = (config: Partial<InputExtension<string>>, props:DateInputProps&{label:string}) => {
  const {value="", validate, } = config;
  return customInput<string>({value, validate}, ({value, setValue}) => (
    <DateInput minDate={dayjs()} {...props} value={value ? dayjs(value) : undefined} onChange={(v:dayjs.Dayjs) => setValue(v.toISOString())}/>
  ))
}