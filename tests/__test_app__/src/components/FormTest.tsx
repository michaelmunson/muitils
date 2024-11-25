import Form, {text, number, date, autocomplete, select} from "../../../../src/Form";

export default function FormTest() {
  return (
    <Form 
      inputs={{
        firstName: text('First Name'),
        lastName: text('Last Name'),
        gender: select('Gender', {
          options:['Male', 'Female', 'Other']
          .map(v=>({value:v, label:v}))
        }),
        age: number('Age', {input:{min: 0, max: 100}, validate:v=>v>=0}),
        petFish: autocomplete('Pet Fish', {
          value: {id: 'asd', label: 'asd'},
          options:[{id: 'asd', label: 'asd'}, {id: 'qwe', label: 'qwe'}]
        }),
        birthday: date('Birthday', {
          validate: v=> Boolean(v && typeof v === 'string')
        }),
        rowTest: {
          hello: text('Hello'),
          world: text('World')
        }
      }} 
      onSubmit={(v)=>{
        alert(JSON.stringify(v, null, 2))
      }}
      onChange={(v)=>{
        console.log(JSON.stringify(v, null, 2))
      }}
    />
  )
}