import { FlexProps } from '../Flex';
type FieldProps = {
    label: string;
    value?: string;
} & FlexProps;
declare function Field(props: FieldProps): import("react/jsx-runtime").JSX.Element;
export { type FieldProps, Field, };
