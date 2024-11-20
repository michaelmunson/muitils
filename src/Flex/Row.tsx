import { RowProps } from "./types";
import Flex from "./Flex";

/**
 * @description A pre-configured [Flex](./Flex.tsx) component that arranges children horizontally.
 * @import
 * ```tsx
 * import {Row} from 'muitils'
 * // or
 * import {Row} from 'muitils/Flex'
 * ```
 * ---
 * @example
 * ```tsx
 * <Row center={['x', 'y']}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Row>
 * ```
 * @example
 * ```tsx
 * <Row layout={{x:'space-between', y:'center'}}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Row>
 * ```
 * @example
 * ```tsx
 * <Row reverse>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Row>
 * ```
 */
function Row(props:Omit<RowProps, "row">){
  return <Flex row {...props}/>
}

export {
  type RowProps,
  Row
}


export default Row;