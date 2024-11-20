import {TableCellProps, TableProps as MuiTableProps, TableContainerProps, TableBodyProps, TableHeadProps, TableRowProps, SkeletonProps } from "@mui/material";

export type Cell = (TableCellProps & { value?: React.ReactNode })

export type TableProps = TableContainerProps & {
  head: Cell[];
  data: Cell[][] | undefined;
  loadingBehavior?: {
    rows?: number;
    SkeletonProps?: SkeletonProps;
  }
  TableProps?: MuiTableProps;
  TableHeadProps?: TableHeadProps;
  TableBodyProps?: TableBodyProps;
  TableRowProps?: TableRowProps;
  TableCellProps?: TableCellProps;
}