import { useState } from 'react';
import { JsonForms, JsonFormsReactProps, JsonFormsInitStateProps } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { Col, ColProps, Row, RowProps } from '../Flex';
import Button, { ButtonProps } from '../Button';

type OGProps = JsonFormsReactProps & JsonFormsInitStateProps;
export type JsonFormProps<T> = Omit<OGProps, 'renderers' | 'cells' | 'data' | 'onSubmit' | 'value'> & {
  renderers?: OGProps['renderers']
  cells?: OGProps['cells']
  value: T
  onChange?: (input:{data:T, errors: any[]}) => void
  onSubmit?: (data: T) => Promise<T>
  ColProps?: ColProps
  SubmitProps?: {
    WrapperProps?: RowProps
    ButtonProps?: ButtonProps
  }
}

export default function JsonForm<T>(props: JsonFormProps<T>) {
  const { onSubmit, onChange, ColProps, SubmitProps, ...rest } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState(props.value);
  return (
    <Col {...ColProps}>
      <JsonForms
        data={value}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({data, errors}) => {
          setValue(data);
          onChange?.({data, errors});
          setCanSubmit(errors?.length === 0);
        }}
        {...rest}
      />
      <Row {...SubmitProps?.WrapperProps}>
        <Button loading={submitting} loadingText="Submitting" disabled={!canSubmit} onClick={async () => {
          setSubmitting(true);
          await onSubmit?.(value);
          setSubmitting(false);
        }} {...SubmitProps?.ButtonProps}>
          {SubmitProps?.ButtonProps?.children ?? 'Submit'}
        </Button>
      </Row>
    </Col>
  )
}