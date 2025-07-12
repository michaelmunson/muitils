import { useCallback, useEffect, useId, useState } from "react"
import { Col, Row } from "../Flex"
import { type FormProps, FormInputGroup, FormResult } from "./types";
import { TextInput, CustomInput, TextFormInput, CustomFormInput, DateInput } from "./inputs";
import { defaultValidate, deriveInitialFormInputGroupResult, isCustomInput, isFormInput, isFormInputRecord, validateForm } from "./utils";
import Button from "../Button";
import { isDateInput, isTextInput } from "./inputs/utils";
import formSx, { styles } from "./sx";
import { getConfig } from "../config";


/**
 * @description A component that creates a form from a [FormInputGroup](./types.ts#FormInputGroup)
 * @importing
 * ```tsx
 * import {Form} from 'muitils'
 * // or
 * import Form, {...helpers} from 'muitils/Form'
 * ```
 * <br><hr><br>
 * ## Props
 * - `inputs` - The inputs to be used in the form.
 * - `onSubmit` - The function to be called when the form is submitted.
 * - `onChange` - The function to be called when the form is changed.
 * - `sx` - The style to be applied to the form.
 * - `SubmitProps` - The props to be applied to the submit button.
 * - `isValidate` - Whether to validate the form.
 * 
 * ## Basic Usage
 * @example
 * ```tsx
 * import Form, {text, number, select, autocomplete, date} from 'muitils/Form';
 * 
 * <Form 
 *  inputs={{
 *   firstName: text('First Name'),
 *   lastName: text('Last Name'),
 *   gender: select('Gender', {
 *     options:['Male', 'Female', 'Other']
 *      .map(v=>({value:v, label:v}))
 *   }),
 *   age: number('Age', {input:{min: 18}, validate:v=>v>=18}),
 *   petFish: autocomplete('Pet Fish', {
 *     options:['Goldfish', 'Tropical Fish', 'Catfish']
 *     .map(v=>({value:v, label:v}))
 *   }),
 *   birthday: date('Birthday', {
 *     minDate: new Date(1900, 0, 1).toISOString(),
 *     maxDate: new Date(2024, 11, 20).toISOString()
 *   }),
 * }} 
 * onSubmit={(v)=>{
 *   console.log(v.firstName); // string
 *   console.log(v.lastName); // string
 *   console.log(v.gender); // 'Male' | 'Female' | 'Other'
 *   console.log(v.age); // number
 *   console.log(v.petFish); // string | {id:string, label:string}
 *   console.log(v.birthday); // string (iso date string)
 * }}/>
 * ```
 * ## Custom Inputs
 * Custom inputs are useful when you need to create a custom input that is not supported by the library.
 * @example
 * ```tsx
 * export function CustomInputForm(){
    const [isValidate, setIsValidate] = useState(false);
    return (
      <Form
        inputs={{
          email: custom({
            value: '',
            validate: (v:string) => v.includes('@')
          }, ({value, setValue, isValid}) => (
            <div>
              <label>Email</label>
              <input 
                type="text" 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                onBlur={() => setIsValidate(true)}
              />
              {!isValid && <span>Invalid email</span>}
            </div>
          ))
        }}
        onSubmit={v => alert(JSON.stringify(v, null, 2))}
        isValidate={isValidate}
      />
    )
  }
 * ```
 * ## Controlled Inputs
 * Controlled inputs are useful when you need to control the value of an input from outside of the form.
 * @example
 * ```tsx
 * export function ControlledForm(){
    const [password, setPassword] = useState('');
    const [isValidate, setIsValidate] = useState(false);
    return (
      <Form
        inputs={{
          email: text('Email'),
          password: text('Password', { 
            value: password,
            setValue: v => setPassword(v),
            input: { type: 'password' }, 
          }),
          confirmPassword: text('Confirm Password', { 
            validate: v => v === password,
            errorText: 'Passwords do not match',
            onBlur: () => setIsValidate(true),
            input: { type: 'password' },
          }),
        }}
        onSubmit={v => alert(JSON.stringify(v, null, 2))}
        // onChange={({password}) => setPassword(password)}
        isValidate={isValidate}
      />
    )
  }
 * ```
 */
export default function Form<T extends FormInputGroup>(props: FormProps<T>) {
  const id = useId();
  const submitButtonId = `${id}-submit-button`;
  const { inputs, onSubmit, onChange, sx: _sx, SubmitProps, isValidate: _isValidate, ...rest } = props;
  const WrapperProps = SubmitProps?.WrapperProps;
  const ButtonProps = SubmitProps?.ButtonProps;
  const [formInputResult, setFormInputResult] = useState<FormResult<T>>(deriveInitialFormInputGroupResult(inputs));
  const [isValidate, setIsValidate] = useState(_isValidate ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsValidate(_isValidate ?? false);
  }, [_isValidate])

  useEffect(() => {
    if (onChange) onChange(formInputResult);
  }, [formInputResult, onChange])

  const handleSetInputResult = useCallback((result: FormResult<T>, key: string[], value: any) => {
    const newResult: any = { ...result };
    if (key.length === 1) newResult[key[0]] = value;
    else newResult[key[0]][key[1]] = value;
    setFormInputResult(newResult);
  }, [setFormInputResult])

  const handleCanSubmit = useCallback(() => {
    setIsValidate(true);
    return validateForm({ inputs, result: formInputResult });
  }, [formInputResult, inputs])

  const handleSubmit = useCallback(async () => {
    if (!handleCanSubmit()) return;
    setIsSubmitting(true);
    await onSubmit(formInputResult);
    setIsSubmitting(false);
  }, [formInputResult, onSubmit, handleCanSubmit])

  const GenericFormInput = useCallback(function ({ keys, props, result }: { keys: string[]; props: TextFormInput<any> | CustomFormInput<any>, result: FormResult<T> }) {
    const value = keys.length === 1 ? result[keys[0]] : result[keys[0]][keys[1]];
    console.log(props);
    if (isTextInput(props)) {
      const {setValue:__set_value__, ...rest} = props;
      return <TextInput
        {...rest}
        value={value}
        setValue={v => {
          handleSetInputResult(result, keys, v);
          if (__set_value__) __set_value__(v);
        }}
        isValidate={isValidate}
      />
    }
    else if (isDateInput(props)) {

      return <DateInput
        {...props}
        value={value}
        setValue={(v: any) => handleSetInputResult(result, keys, v)}
      />
    }
    else if (isCustomInput(props)) {
      const [{ validate = defaultValidate, ...rest }, input] = [props[0], props[1]];
      return (
        <CustomInput
          {...rest}
          input={input}
          value={value}
          setValue={(v: any) => handleSetInputResult(result, keys, v)}
          isValid={!isValidate || (isValidate && validate(value))}
        />
      )
    }
    throw new TypeError(`Incorrect props input for GenericFormInput "${keys.join('/')}"`)
  }, [isValidate, handleSetInputResult])

  return getConfig().Form.transform(
    <Col id={id} gap={3} sx={formSx(styles(), _sx)} {...rest}>
      {Object.entries(inputs).map((entry, index) => {
        const [key, value] = entry;
        const toProps = <T extends Record<string, any>>(props: T) : T => {
          if (index === Object.keys(inputs).length - 1) return {
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter') {
                try {
                  e.preventDefault();
                  e.stopPropagation();
                  const submitButton = document.getElementById(submitButtonId);
                  if (submitButton) submitButton.click();
                } catch (error) {}
              }
            },
            ...props
          }
          return props;
        }
        if (isFormInput(value) || isCustomInput(value)) return (
          <GenericFormInput key={`form-input-${index}`} keys={[key]} props={toProps(value)} result={formInputResult} />
        );
        else if (isFormInputRecord(value)) return (
          <Row key={`form_input_row-${index}`} className={`form_input_row`}>
            {Object.entries(value).map((entry2, index2) => {
              const [key2, value2] = entry2;
              return (
                <GenericFormInput key={`form-input-${index}-${index2}`} keys={[key, key2]} props={toProps(value2)} result={formInputResult} />
              )
            })}
          </Row>
        );
        return <></>
      })}
      <Row center={'x'} {...WrapperProps}>
        <Button
          id={submitButtonId}
          variant="contained"
          color="success"
          onClick={handleSubmit}
          className={formSx.classes.submit_button}
          loading={isSubmitting}
          loadingText="Submitting"
          disabled={!validateForm({ inputs, result: formInputResult })}
          {...ButtonProps}
        >
          {ButtonProps?.children ?? 'Submit'}
        </Button>
      </Row>
    </Col>
  )
}
