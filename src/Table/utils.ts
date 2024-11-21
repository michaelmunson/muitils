import { MuiTableBodyProps, MuiTableHeadProps, TableCellInput, TableRowInput } from "./types"
import { MuiTableRowProps } from "./types"

type HeadArgs = [props:MuiTableHeadProps, cells:TableCellInput[]] | [cells:TableCellInput[]]
type BodyArgs = [props:MuiTableBodyProps, cells:TableRowInput[]] | [cells:TableRowInput[]]
type RowArgs = [props:MuiTableRowProps, cells:TableCellInput[]] | [cells:TableCellInput[]]

export const body = (args:BodyArgs) => ({
  ...(Array.isArray(args) ? args[0] : {}),
  rows: Array.isArray(args) ? args[1] : args
});

export const row = (args:RowArgs) => ({
  ...(Array.isArray(args) ? args[0] : {}),
  cells: Array.isArray(args) ? args[1] : args
})

export const head = (args:HeadArgs) => ({
  ...(Array.isArray(args) ? args[0] : {}),
  cells: Array.isArray(args) ? args[1] : args
});
