import { useEffect, useState } from "react";
import { Col } from "../../../../src";
import Form, { text, number, date, autocomplete, select, form, custom } from "../../../../src/Form";
import { useLog } from "../Log";

const onSubmit = async (v:any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  alert(JSON.stringify(v, null, 2));
}

export function FormTest() {
  return (
    <Col gap={3}>
      <Form
        inputs={{
          firstName: text('First Name'),
          lastName: text('Last Name'),
          gender: select('Gender', {
            options: ['Male', 'Female', 'Other']
              .map(v => ({ value: v, label: v }))
          }),
          age: number('Age', { input: { min: 0, max: 100 }, validate: v => v >= 0 }),
          petFish: autocomplete('Pet Fish', {
            value: [{value: 'Goldfish', label: 'Goldfish'}],
            options: ['Goldfish', 'Tropical Fish', 'Catfish']
              .map(v => ({ value: v, label: v }))
          }),
          birthday: date('Birthday', {
            validate: v => Boolean(v && typeof v === 'string')
          }),
          rowTest: {
            hello: text('Hello'),
            world: text('World')
          }
        }}
        onSubmit={onSubmit}
        onChange={(v) => {
          console.log(JSON.stringify(v, null, 2))
        }}
      />      
    </Col>
  )
}

export function FormTest2(){
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

export function ControlledFormTest(){
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