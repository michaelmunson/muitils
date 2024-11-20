import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";
import tableSx, { styles } from "./sx";
import { TableProps, TableCellInput } from "./types";
import { mergeSx } from "../sx";
import { getConfig } from "../config";

const classes = tableSx.classes;

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
  const skeletons = props.head.map(() => ({ value: <Skeleton width={'90%'} height={'20px'} {...props.loadingBehavior?.SkeletonProps} /> }));
  const { head, body, TableProps, TableHeadProps, TableBodyProps, TableRowProps, TableCellProps, sx, ...rest } = props;
  const style = mergeSx([styles(), tableSx(sx)], { merge: 'deep' });

  return (
    <TableContainer component={Paper} sx={style} {...rest} {...getConfig().Table.props}>
      <MuiTable className={classes.table} stickyHeader aria-label="simple table" {...TableProps} >
        <TableHead {...TableHeadProps} className={classes.table_head}>
          <TableRow {...TableRowProps} className={classes.table_row}>
            {head.map((h, i) => (
              <TableCell {...TableCellProps} key={`table-head-${i}`} align={'left'} {...h}>{h.children ?? h.value ?? ''}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...TableBodyProps} className={classes.table_body}>
          {body.map(({data, ...props}, i) => (
            <TableRow key={`table-body-row-${i}`} {...TableRowProps} {...props} className={classes.table_row}>
              {data.map((cell, j) => (
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
          ))}
        </TableBody>
      </MuiTable>
      {/* <Row center={'x'}>
          {isPending && <Spinner/> }
        </Row> */}
    </TableContainer >
  )
}