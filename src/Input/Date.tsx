import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {createSx, MuiSxProps} from '../sx';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';

const sx = createSx({})

const DateInputSx = sx({
  width: '100%'
})

type DateInputProps = Omit<DatePickerProps<any>, 'sx'> & {sx?: MuiSxProps} & {
  value?: string | number | Date | dayjs.Dayjs
};

/**
 * @description MUI Wrapper for the DatePicker component
 * @importing
 * ```tsx
 * import {DateInput} from 'muitils'
 * // or
 * import {DateInput} from 'muitils/Input'
 * ```
 * <br><hr><br>
 * @example 
 * ```tsx
 * <DateInput value={dayjs().toISOString()}/>
 * ```
*/
function DateInput(props: DateInputProps) {
  const { value, sx:_sx, ...rest } = props;
  const dayjsValue:dayjs.Dayjs = (['string','number'].includes(typeof value) || value instanceof Date) ? dayjs(value) : value;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={sx(DateInputSx, _sx)}
        value={dayjsValue}
        {...rest}/>
    </LocalizationProvider>
  )
}

export {
  type DateInputProps,
  DateInput
}

export default DateInput;