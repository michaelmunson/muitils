import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";
import tableSx, { styles } from "./sx";
import { TableProps } from "./types";
import { mergeSx } from "../sx";
import { getConfig } from "../config";

const classes = tableSx.classes;

function TableBodySkeleton(props:TableProps) {
  const { loadingBehavior, head:{cells}, TableRowProps, TableCellProps } = props;
  return <>
    {Array(loadingBehavior?.rows ?? 5).fill(null).map((_, rowi) => (
      <TableRow {...TableRowProps} key={`table-skeleton-${rowi}`}>
        {cells.map((_, i) => (
          <TableCell {...TableCellProps} key={`table-skeleton-${rowi}-${i}`}>
            <Skeleton
              width={'90%'}
              height={'20px'}
              {...loadingBehavior?.SkeletonProps}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
}
/**
 * @description A table component wrapper for MUI Table.
 * @example
 * ```tsx
 * import Table, { body, row, head } from 'muitils/Table';
 * <Table 
 *   head={head(
 *     {value: 'Name'},
 *     {value: 'Age'}
 *   )} 
 *   data={body(
 *     row({sx: {backgroundColor: 'red'}}, {value: 'Michael'}, {value: 34}),
 *     row({sx: {backgroundColor: 'blue'}}, {value: 'Sarah'}, {value: 32})
 *   )}
 *   loadingBehavior={{rows: 5, SkeletonProps: {variant: 'text'}}}
 *   TableProps={{sx: {maxHeight: '500px'}}}
 *   TableHeadProps={{sx: {backgroundColor: 'red'}}}
 *   TableBodyProps={{sx: {backgroundColor: 'blue'}}}
 *   TableRowProps={{sx: {backgroundColor: 'green'}}}
 *   TableCellProps={{sx: {backgroundColor: 'yellow'}}}
 *   {...rest} // MuiTableProps
 * />
 * ```
*/
export default function Table(props: TableProps) {
  const { head, body, loading, TableProps, TableHeadProps, TableBodyProps, TableRowProps, TableCellProps, sx, ...rest } = props;
  const { rows, ...bodyProps } = body;
  const { cells, ...headProps } = head;
  const style = mergeSx([styles(), tableSx(sx)], { merge: 'deep' });

  return (
    <TableContainer component={Paper} sx={style} {...rest} {...getConfig().Table.props}>
      <MuiTable className={classes.table} stickyHeader aria-label="simple table" {...TableProps} >
        <TableHead {...TableHeadProps} {...headProps} className={classes.table_head}>
          <TableRow {...TableRowProps} className={classes.table_row}>
            {cells.map((h, i) => (
              <TableCell {...TableCellProps} key={`table-head-${i}`} align={'left'} {...h}>{h.children ?? h.value ?? ''}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...TableBodyProps} {...bodyProps} className={classes.table_body}>
            {rows.map(({cells, ...props}, i) => (
              <TableRow key={`table-body-row-${i}`} {...TableRowProps} {...props} className={classes.table_row}>
                {cells.map((cell, j) => (
                <TableCell
                  {...TableCellProps}
                  key={`table-body-cell-${j}`}
                  align={'left'}
                  className={classes.table_cell}
                  {...cell}
                  >
                  {cell.children ?? cell.value ?? ''}
                </TableCell>
              ))}
              </TableRow>
            ))
          }
          {loading && <TableBodySkeleton {...props} />}
        </TableBody>
      </MuiTable>
    </TableContainer >
  )
}