import { Stack } from "@mui/material";
import { getDirection, getLayout } from "./utils";
import { FlexProps } from "./types";


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