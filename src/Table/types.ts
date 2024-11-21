import {
  TableCellProps as MuiTableCellProps,
  TableProps as MuiTableProps,
  TableContainerProps as MuiTableContainerProps,
  TableBodyProps as MuiTableBodyProps,
  TableHeadProps as MuiTableHeadProps,
  TableRowProps as MuiTableRowProps,
  SkeletonProps
} from "@mui/material";

export type { MuiTableCellProps, MuiTableRowProps, MuiTableProps, MuiTableBodyProps, MuiTableHeadProps }

export type TableCellInput = (MuiTableCellProps & { value?: React.ReactNode });
export type TableRowInput = MuiTableRowProps & { cells: TableCellInput[] };
export type TableHeadInput = MuiTableHeadProps & { cells: TableCellInput[] };
export type TableBodyInput = MuiTableBodyProps & { rows: TableRowInput[] };

export type TableProps = MuiTableContainerProps & {
  head: TableHeadInput;
  body: TableBodyInput;
  loading?: boolean;
  loadingBehavior?: {
    rows?: number;
    SkeletonProps?: SkeletonProps;
  }
  TableProps?: MuiTableProps;
  TableHeadProps?: MuiTableHeadProps;
  TableBodyProps?: MuiTableBodyProps;
  TableRowProps?: MuiTableRowProps;
  TableCellProps?: MuiTableCellProps;
}