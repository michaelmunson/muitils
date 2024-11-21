import Table, { row, head, body} from "../../../../../src/Table";

function TableTest() {
  return (
    <>
      <Table
        head={head([{value: 'th-1-a'}, {value: 'th-1-b'}])}
        body={body([
          row([{value: 'cell-1-a'}, {value: 'cell-1-b'}])
        ])}
      />
    </>
  )
}

export default TableTest
