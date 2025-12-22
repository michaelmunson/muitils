import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForm } from '../../../../src/JsonForm';

const schema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3,
      "description": "Please enter your name"
    },
    "vegetarian": {
      "type": "boolean"
    },
    "birthDate": {
      "type": "string",
      "format": "date"
    },
    "nationality": {
      "type": "string",
      "enum": [
        "DE",
        "IT",
        "JP",
        "US",
        "RU",
        "Other"
      ]
    },
    "personalData": {
      "type": "object",
      "properties": {
        "age": {
          "type": "integer",
          "description": "Please enter your age."
        },
        "height": {
          "type": "number"
        },
        "drivingSkill": {
          "type": "number",
          "maximum": 10,
          "minimum": 1,
          "default": 7
        }
      },
      "required": [
        "age",
        "height"
      ]
    },
    "occupation": {
      "type": "string"
    },
    "postalCode": {
      "type": "string",
      "maxLength": 5
    }
  },
  "required": [
    "occupation",
    "nationality"
  ]
};
const uischema = {
  "type": "VerticalLayout"
};

const initialData = {
  "name": "John Doe",
  "vegetarian": false,
  "birthDate": "1985-06-02",
  "personalData": {
    "age": 34
  },
  "postalCode": "12345"
}


export default function JsonFormTest() {
  return (
    <JsonForm 
      value={initialData}
      schema={schema}
      onSubmit={async (data) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(JSON.stringify(data, null, 2));
      return data;
    }} />
  )
}