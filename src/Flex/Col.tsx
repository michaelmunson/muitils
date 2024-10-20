import { ColProps } from "./types";
import Flex from "./Flex";

function Col(props:Omit<ColProps, "row">){
  return <Flex col {...props}/>
}

export {
  type ColProps,
}

export default Col;