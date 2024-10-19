import dayjs from 'dayjs';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
export type DateInputProps = DatePickerProps<any> & {
    value?: string | number | Date | dayjs.Dayjs;
};
export declare function DateInput(props: DateInputProps): import("react/jsx-runtime").JSX.Element;
