
import { Col } from "../../../src/Flex"
import TableTest from "./components/TableTest"
import FormTest from "./components/FormTest"

function App() {
  return (
    <Col>
      <h1>TABLE</h1>  
      <TableTest />
      <h1>FORM</h1>  
      <FormTest />
    </Col>
  )
}

export default App