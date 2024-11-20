import {TableCellProps, Skeleton, TableContainerProps, TableBodyProps, TableHeadProps, TableRowProps, SkeletonProps } from "@mui/material";

export type Cell = (TableCellProps & { value?: React.ReactNode })

export type TableProps = {
  head: Cell[];
  data: Cell[][] | undefined;
  loadingBehavior?: {
    rows?: number;
    SkeletonProps?: SkeletonProps;
  }
  TableContainerProps?: TableContainerProps;
  TableProps?: TableProps;
  TableHeadProps?: TableHeadProps;
  TableBodyProps?: TableBodyProps;
  TableRowProps?: TableRowProps;
  TableCellProps?: TableCellProps;
}