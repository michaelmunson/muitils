import { RowProps } from "./types";
import Flex from ".";

export {
  type RowProps
}

export default function Row(props:Omit<RowProps, "row">){
  return <Flex row {...props}/>
}