import dayjs from "dayjs";
import { DateInput as DateInputComponent, DateInputProps } from "../../../Input";



export default function DateInput(props:DateInputProps & {value:string, setValue:(value:string) => void}){
  return (
    <DateInputComponent 
      {...props} 
      value={props.value ? dayjs(props.value) : undefined} 
      onChange={(v:dayjs.Dayjs) => props.setValue(v.toISOString())}
    />
  )
}
