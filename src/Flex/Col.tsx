import { ColProps } from "./types";
import Flex from "./Flex";

/**
 * @description A pre-configured [Flex](./Flex.tsx) component that arranges children vertically.
 * @import
 * ```tsx
 * import {Col} from 'muitils'
 * // or
 * import {Col} from 'muitils/Flex'
 * ```
 * ---
 * @example 
 * ```tsx
 * <Col center={['x', 'y']}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Col>
 * ```
 * @example
 * ```tsx
 * <Col layout={{x:'space-between', y:'center'}}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Col>
 * ```
 * @example
 * ```tsx
 * <Col reverse>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Col>
 * ```
 */
function Col(props:Omit<ColProps, "row">){
  return <Flex col {...props}/>
}

export {
  type ColProps,
}

export default Col;