import { Button, Icon, mergeSx } from "../";
import { ButtonProps } from "@mui/material";

type ButtonPropsExtension = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export type FileInputProps = Omit<ButtonProps, keyof ButtonPropsExtension> & ButtonPropsExtension

/**
 * @description a [Button](https://michaelmunson.github.io/muitils/functions/Button.Button.html) wrapper around an `<input type="file"/>` that allows the user to upload files
 * @importing
 * ```tsx
 * import {FileInput} from 'muitils'
 * // or
 * import {FileInput} from 'muitils/Input'
 * ```
 * @example
 * ```tsx
 * <FileInput 
 *   onChange={handleChange} 
 *   inputProps={{ accept: '.png,.jpg,.jpeg' }}
 * />
 * ```
 */
export default function FileInput(props: FileInputProps) {
  const { onChange, sx, inputProps, label, ...rest } = props;
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<Icon name="CloudUpload" />}
      sx={mergeSx([sx, {
        '& input': {
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
          whiteSpace: 'nowrap',
          width: 1,
        }
      }], { merge: 'deep' })}
      {...rest}
    >
      {label || 'Upload files'}
      <input type="file" hidden multiple onChange={onChange} {...inputProps} />
    </Button>
  );
}