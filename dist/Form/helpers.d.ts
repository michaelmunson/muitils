import { DateInputProps } from "../Input";
import { InputExtension } from "./types";
export declare const dateInput: (config: Partial<InputExtension<string>>, props: DateInputProps & {
    label: string;
}) => import("./types").CustomFormInput<string>;
