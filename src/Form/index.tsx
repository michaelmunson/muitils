import { useCallback, useEffect, useState } from "react"
import Col from "../Flex/Col"
import { type FormProps, CustomFormInput, TextFormInput, FormInputGroup, FormResult, isCustomInput, isFormInput, isFormInputRecord } from "./types"
import { TextField } from "@mui/material";
import Row from "../Flex/Row";
import sx from "../sx";
import { defaultValidate, deriveInitialFormInputGroupResult, validateForm, textInput, customInput, form, validationModifier } from "./utils";
import Button from "../Button";
export * from './helpers';
export {
  textInput, 
  customInput, 
  form, 
  validationModifier
}

type InputPropsExtension<T> = { setValue: (value: T) => T; isValidate: boolean };

function CustomInput<T>(props: { input: CustomFormInput<T>[1] } & Parameters<CustomFormInput<T>[1]>[0]) {
  const { input, ...args} = props;

  return input({...args});
}

function TextInput<T>(props: TextFormInput<T> & InputPropsExtension<T>) {
  const { validate: _validate, transform, setValue, isValidate, helperText: _helperText, errorText, value, ...rest } = props;
  const validate = _validate ?? defaultValidate;
  const [isValid, setIsValid] = useState(validate(value));
  const handleValidate = (value: T) => {
    setIsValid(validate(value));
  }

  const helperText = (() => {
    if (isValidate) return (
      isValid ? "" : (errorText ?? `${props.label} cannot be empty`)
    )

    return _helperText ?? "";
  })()

  return (
    <TextField
      {...rest}
      error={isValidate && !isValid}
      helperText={helperText}
      value={value}
      onChange={e => {
        const rawInput = e.target.value;
        const value: T = transform ? transform(rawInput) : rawInput as T;
        handleValidate(value);
        setValue(value);
      }} />
  )
}

const STYLES = sx({
  '& .form-input-row' : {
    width: '100%',
    gap: 2
  }
})

export default function Form<T extends FormInputGroup>(props: FormProps<T>) {
  const { inputs, onSubmit, onChange, sx: _sx, ...rest } = props;
  const [formInputResult, setFormInputResult] = useState<FormResult<T>>(deriveInitialFormInputGroupResult(inputs));
  const [isValidate, setIsValidate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (onChange) onChange(formInputResult);
  }, [formInputResult])

  const handleSetInputResult = (result: FormResult<T>, key: string[], value: any) => {
    const newResult: any = { ...result };
    if (key.length === 1) newResult[key[0]] = value;
    else newResult[key[0]][key[1]] = value;
    setFormInputResult(newResult);
  }

  const handleCanSubmit = () => {
    setIsValidate(true);
    return validateForm({ inputs, result: formInputResult });
  }

  const handleSubmit = async () => {
    if (!handleCanSubmit()) return;
    setIsSubmitting(true);
    await onSubmit(formInputResult);
    setIsSubmitting(false);
  }

  const GenericFormInput = useCallback(function ({ keys, props, result }: { keys: string[]; props: TextFormInput<any> | CustomFormInput<any>, result: FormResult<T> }) {
    const value = keys.length === 1 ? result[keys[0]] : result[keys[0]][keys[1]];
    if (isFormInput(props)) {
      return <TextInput
        {...props}
        value={value}
        setValue={v => handleSetInputResult(result, keys, v)}
        isValidate={isValidate}
      />
    }
    else if (isCustomInput(props)) {
      const [{validate = defaultValidate}, input] = props;

      return (
        <CustomInput
          input={input}
          value={value}
          setValue={v => handleSetInputResult(result, keys, v)}
          isValid={!isValidate || (isValidate && validate(value))}/>
      )
    }
    throw new TypeError(`Incorrect props input for GenericFormInput "${keys.join('/')}"`)
  }, [isValidate]);



  return (

    <Col gap={3} sx={sx(STYLES, _sx)} {...rest}>
      {Object.entries(inputs).map((entry, index) => {
        const [key, value] = entry;
        if (isFormInput(value) || isCustomInput(value)) return (
          <GenericFormInput key={`form-input-${index}`} keys={[key]} props={value} result={formInputResult} />
        );
        else if (isFormInputRecord(value)) return (
          <Row key={`form-input-row-${index}`} className={`form-input-row`}>
            {Object.entries(value).map((entry2, index2) => {
              const [key2, value2] = entry2;
              return (
                <GenericFormInput key={`form-input-${index}-${index2}`} keys={[key, key2]} props={value2} result={formInputResult} />
              )
            })}
          </Row>
        );
        return <></>
      })}
      <Row center={'x'}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{borderRadius: '20px', width: '200px', fontWeight:'bold', fontSize: '1.1rem', mt:2}}
          loading={isSubmitting}
          loadingText="Submitting"
          >
          Submit
        </Button>
      </Row>
    </Col>
  )
}
