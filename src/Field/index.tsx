import { Skeleton, Typography } from "@mui/material";
import Flex, {FlexProps } from "../Flex";
import sx from "../sx";

const cls = sx.classes('field','value')
const FieldSx = sx({
  p:0,
  [sx._cls(cls.field)] : {
    pr: 1
  }
})

export default function Field(props:{label:string, value?:string} & FlexProps){
  const {label, value, sx:_sx, ...rest} = props;

  return (
    <Flex row sx={sx(FieldSx, _sx)} {...rest}>
      <Typography className={cls.field}><b>{label}</b>:</Typography>
      {!value ? (
        <Skeleton width={'200px'}/>
      ) : (
        <Typography className="value">{value}</Typography>
      )}
    </Flex>
  )
}