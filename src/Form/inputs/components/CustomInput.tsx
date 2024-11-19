
import { CustomFormInput } from "../types";

export type CustomInputProps<T> = { input: CustomFormInput<T>[1] } & Parameters<CustomFormInput<T>[1]>[0];

export default function CustomInput<T>(props: CustomInputProps<T>) {
  const { input, ...args} = props;

  return input({...args});
}

