import { CircularProgress, CircularProgressProps } from "@mui/material";
import Col from "../Flex/Col";
import {createSx} from "../sx";

const sx = createSx();

type SpinnerProps = Omit<CircularProgressProps, "size"> & {
  /**
   * @description If true, the spinner is wrapped in flexbox and will fill the container
   */
  fillContainer?:boolean, 
  /**
   * @description The size of the spinner (in pixels)
   */
  size?:{x?:number, y?:number}
}

/**
 * @description MUI Wrapper for the CircularProgress component
 * @import
 * ```tsx
 * import {Spinner} from 'muitils'
 * // or
 * import Spinner from 'muitils/Spinner'
 * ```
 * ---
 * @example 
 * ```tsx
 * <Spinner fillContainer size={{x:30, y:30}} sx={{color:'red'}}/>
 * ```
*/
function Spinner({fillContainer, ...props}:SpinnerProps){
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

export {
  type SpinnerProps,
  Spinner
}

export default Spinner;