
import { Col, Row } from "../../../src/Flex"
import { Button } from "../../../src/Button"
import TableTest from "./components/TableTest"
import { FormTest, FormTest2, ControlledFormTest   } from "./components/FormTest"
import { useState } from "react";
import { Divider, Typography } from "@mui/material";

const TESTS = ['Table', 'Form', 'Form2', 'Controlled Form', 'Button'] as const;
type Test = (typeof TESTS)[number];

function TestComponent(props:{test:Test}){
  switch (props.test) {
    case 'Table':
      return <TableTest />
    case 'Form':
      return <FormTest />
    case 'Form2':
      return <FormTest2 />
    case 'Controlled Form':
      return <ControlledFormTest />
    case 'Button':
      return <Button loading>Hello</Button>
  }
}

function App() {
  const [test, setTest] = useState<Test>('Table');
  return (
    <Col gap={3}>
      <Row gap={3}>
        {TESTS.map(testName => (
          <Button variant={test === testName ? 'contained' : 'outlined'} key={testName} onClick={()=>setTest(testName)}>{testName}</Button>
        ))}
      </Row>
      <Divider/>
      <Typography variant="h4">{test}</Typography>
      <TestComponent test={test} />
    </Col>
  )
}

export default App
