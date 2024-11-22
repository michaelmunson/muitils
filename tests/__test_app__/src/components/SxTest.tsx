import { Box, BoxProps } from "@mui/material";
import { createSx } from "../../../../src";

const sx = createSx({
  classes:['test'] as const,
})

export default function SxTest(props:BoxProps){
  return <Box sx={sx('test', props.sx)}/>
}