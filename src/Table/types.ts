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
export type TableRowInput = MuiTableRowProps & { data: TableCellInput[] };

export type TableProps = MuiTableContainerProps & {
  head: TableCellInput[];
  body: TableRowInput[];
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