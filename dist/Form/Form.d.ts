import { FormProps, FormInputGroup } from './types';
import { textInput, customInput, form, validationModifier } from './utils';
export * from './helpers';
export { textInput, customInput, form, validationModifier };
declare function Form<T extends FormInputGroup>(props: FormProps<T>): import("react/jsx-runtime").JSX.Element;
export { Form };
export default Form;
