import { default as dayjs } from 'dayjs';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
type DateInputProps = DatePickerProps<any> & {
    value?: string | number | Date | dayjs.Dayjs;
};
declare function DateInput(props: DateInputProps): import("react/jsx-runtime").JSX.Element;
export { type DateInputProps, DateInput };
export default DateInput;
