import { Stack } from "@mui/material";
import { getDirection, getLayout } from "./utils";
import { FlexProps } from "./types";

/**
 * @description A wrapper around MUI's `Stack` component that provides an easier way to create flexible layouts.
 * @importing
 * ```tsx
 * import {Flex} from 'muitils'
 * // or
 * import Flex, {Col, Row, ...types} from 'muitils/Flex'
 * ```
 * <br><hr><br>
 * @example
 * ```tsx
 * <Flex layout={{x:'space-between', y:'center'}}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 * @example
 * ```tsx
 * <Flex col reverse>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
function Flex(props:FlexProps){
  const layout = getLayout(props);
  const direction = getDirection(props);
  
  if ('row' in props) delete props.row;
  if ('col' in props) delete props.col;
  if ('layout' in props) delete props.layout;
  Object.assign(props, layout);
  
  return (
    <Stack direction={direction} {...props}>
      {props.children}
    </Stack>
  )
}

export default Flex;