import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";
import tableSx, { styles } from "./sx";
import { TableProps, Cell } from "./types";

const classes = tableSx.classes;

export default function Table(props: TableProps) {
  const skeletons = props.head.map(() => ({ value: <Skeleton width={'90%'} height={'20px'} {...props.loadingBehavior?.SkeletonProps} /> }));
  const { head, data=Array(props.loadingBehavior?.rows ?? 5).fill(skeletons) as Cell[][], TableContainerProps, TableProps, TableHeadProps, TableBodyProps, TableRowProps, TableCellProps } = props;

  return (
    <TableContainer {...TableContainerProps} component={Paper} sx={styles()} >
      <MuiTable {...TableProps} className={classes.table} stickyHeader aria-label="simple table">
        <TableHead {...TableHeadProps} className={classes.table_head}>
          <TableRow {...TableRowProps} className={classes.table_row}>
            {head.map((h, i) => (
              <TableCell {...TableCellProps} key={`table-head-${i}`} align={'left'} {...h}>{h.children ?? h.value ?? ''}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...TableBodyProps} className={classes.table_body}>
          {data.map((row, i) => (
            <TableRow key={`table-body-row-${i}`} {...TableRowProps} className={classes.table_row}>
              {row.map((cell, j) => (
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