import { TableCellInput, TableRowInput } from "./types"
import { MuiTableRowProps } from "./types"

export const body = (...rows:TableRowInput[]) => rows;

export const row = (props:MuiTableRowProps, ...cells:TableCellInput[]) => <TableRowInput>({
  ...props,
  data: cells
})

export const head = (...cells:TableCellInput[]) => cells;