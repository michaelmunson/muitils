import { Skeleton, Typography } from "@mui/material";
import Flex, {FlexProps } from "../Flex";
import {createSx} from "../sx";

const sx = createSx({
  classes: ['field', 'value'] as const,
});

const FieldSx = sx({
  p:0,
  [sx._cls('field')] : {
    pr: 1
  }
})

export default function Field(props:{label:string, value?:string} & FlexProps){
  const {label, value, sx:_sx, ...rest} = props;

  return (
    <Flex row sx={sx(FieldSx, _sx)} {...rest}>
      <Typography className={sx.classes.field}><b>{label}</b>:</Typography>
      {!value ? (
        <Skeleton width={'200px'}/>
      ) : (
        <Typography className="value">{value}</Typography>
      )}
    </Flex>
  )
}