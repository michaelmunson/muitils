import { MuiTableBodyProps, MuiTableHeadProps, TableBodyInput, TableCellInput, TableHeadInput, TableRowInput } from "./types"
import { MuiTableRowProps } from "./types"

type HeadArgs = [props:MuiTableHeadProps, cells:TableCellInput[]] | [cells:TableCellInput[]]
type BodyArgs = [props:MuiTableBodyProps, cells:TableRowInput[]] | [cells:TableRowInput[]]
type RowArgs = [props:MuiTableRowProps, cells:TableCellInput[]] | [cells:TableCellInput[]]

/**
 * @description Creates a TableBodyInput object.
 * @example
 * ```tsx
 * body({id: 'table-body'}, [
 *  row([{value: 'cell-1-a'}, {value: 'cell-1-b'}]),
 *  row([{value: 'cell-2-a'}, {value: 'cell-2-b'}])
 * ])
 * ```
 */
export const body = (...args:BodyArgs) => <TableBodyInput>({
  ...(args.length > 1 ? args[0] : {}),
  rows: args.length > 1 ? args[1] : args[0]
});

/**
 * @description Creates a TableRowInput object.
 * @example
 * ```tsx
 * row({id: 'table-row'}, [
 *  {value: 'cell-1-a'}, {value: 'cell-1-b'}
 * ])
 * ```
 */
export const row = (...args:RowArgs) => <TableRowInput>({
  ...(args.length > 1 ? args[0] : {}),
  cells: args.length > 1 ? args[1] : args[0]
})

/**
 * @description Creates a TableHeadInput object.
 * @example
 * ```tsx
 * head({id: 'table-head'}, [
 *  {value: 'th-1-a'}, {value: 'th-1-b'}
 * ])
 * ```
 */
export const head = (...args:HeadArgs) => <TableHeadInput>({
  ...(args.length > 1 ? args[0] : {}),
  cells: args.length > 1 ? args[1] : args[0]
});

