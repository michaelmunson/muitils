import { ColProps } from "./types";
import Flex from "./Flex";

/**
 * @description A pre-configured [Flex](./Flex.tsx) component that arranges children vertically.
 * @example
 * <Col center={['x', 'y']}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Col>
 * @example
 * <Col layout={{x:'space-between', y:'center'}}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Col>
 * @example
 * <Col reverse>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Col>
 */
function Col(props:Omit<ColProps, "row">){
  return <Flex col {...props}/>
}

export {
  type ColProps,
}

export default Col;