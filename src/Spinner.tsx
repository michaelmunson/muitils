import { CircularProgress, CircularProgressProps } from "@mui/material";
import Col from "./Flex/Col";
import {createSx} from "./sx";

const sx = createSx();

export default function Spinner({fillContainer, ...props}:Omit<CircularProgressProps, "size"> & {fillContainer?:boolean, size?:{x?:number, y?:number}}){
  const {sx:_sx, size, ...rest} = props;

  const Sx = sx(_sx, {width: size?.x ? (`${size.x}px !important`) : 'initial'}, {height: size?.y ? (`${size.y}px !important`) : 'initial'})
  
  if (!fillContainer)
    return <CircularProgress sx={Sx} {...rest}/>
  
  return (
    <Col center={['x','y']} height={'100%'} width={'100%'}>
      <CircularProgress sx={Sx} {...rest}/>
    </Col>
  )
}