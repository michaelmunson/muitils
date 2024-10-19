import { RowProps } from "./types";
import {Flex} from "./Flex";

function Row(props:Omit<RowProps, "row">){
  return <Flex row {...props}/>
}

export {
  type RowProps,
  Row
}


export default Row;