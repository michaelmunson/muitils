import { Stack } from "@mui/material";
import { getDirection, getLayout } from "./utils";
import { FlexProps } from "./types";

/**
 * @description A wrapper around MUI's `Stack` component that provides an easier way to create flexible layouts.
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
  const {layout:_, center:__, children, col, row, ...restProps} = props as any;
  return (
    <Stack direction={direction} {...{...layout, ...restProps}}>
      {children}
    </Stack>
  )
}

export default Flex;