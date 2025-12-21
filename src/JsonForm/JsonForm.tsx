import { useState } from 'react';
import { JsonForms, JsonFormsReactProps, JsonFormsInitStateProps } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

type OGProps = JsonFormsReactProps & JsonFormsInitStateProps;

export type JsonFormProps = Omit<OGProps, 'renderers' | 'cells'> & {
  renderers?: OGProps['renderers']
  cells?: OGProps['cells']
}

export default function JsonForm(props: JsonFormProps) {
  return (
    <JsonForms
        renderers={materialRenderers}
        cells={materialCells}
        {...props}
      />
  )
}