import { useCallback, useEffect, useState } from "react"
import {Col, Row} from "../Flex"
import { type FormProps, FormInputGroup, FormResult } from "./types";
import { TextInput, CustomInput, TextFormInput, CustomFormInput, DateInput } from "./inputs";
import { createSx } from "../sx";
import { defaultValidate, deriveInitialFormInputGroupResult, isCustomInput, isFormInput, isFormInputRecord, validateForm } from "./utils";
import Button from "../Button";
import { form, isDateInput, isTextInput } from "./inputs/utils";
import { text, number, custom, date, autocomplete, select } from "./inputs";

const sx = createSx();

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
    if (isTextInput(props)) {
      return <TextInput
        {...props}
        value={value}
        setValue={v => handleSetInputResult(result, keys, v)}
        isValidate={isValidate}
      />
    }
    else if (isDateInput(props)) {
      return <DateInput
        {...props}
        value={value}
        onChange={v => handleSetInputResult(result, keys, v)}
      />
    }
    else if (isCustomInput(props)) {
      const [{validate = defaultValidate, ...rest}, input] = props;
      return (
        <CustomInput
          input={input}
          value={value}
          setValue={(v:any) => handleSetInputResult(result, keys, v)}
          isValid={!isValidate || (isValidate && validate(value))}
          {...rest}/>
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


const f = form({
  asd: text('asd'),
  qwe: number('qwe'),
  zxc: select('zxc', {options: [{value:'asd', label:'asd'}]}),
  zxc2: custom({value:'', validate:()=>true}, (inputs)=><div>{inputs.value}</div>),
  zxc3: autocomplete('zxc3', {options: [{value:'asd', label:'asd'}]})
})