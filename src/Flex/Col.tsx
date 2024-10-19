import { ColProps } from "./types";
import Flex from ".";

export {
  type ColProps
}

export default function Col(props:Omit<ColProps, "row">){
  return <Flex col {...props}/>
}