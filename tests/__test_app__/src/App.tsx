
import { Col } from "../../../src/Flex"
import { Button } from "../../../src/Button"
import TableTest from "./components/TableTest"
import FormTest from "./components/FormTest"

function App() {
  return (
    <Col>
      <h1>TABLE</h1>  
      <TableTest />
      <h1>FORM</h1>  
      <FormTest />
      <Button loading>
        Hello
      </Button>
    </Col>
  )
}

export default App
