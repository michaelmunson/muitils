import { Col } from "../../../../src/Flex";
import Crumbs, { CrumbItem, CrumbsProps } from "../../../../src/Crumbs";
import { Typography, Paper } from "@mui/material";

const exampleCrumbItems:CrumbItem[] = [
  { label: "Home", path: "/", icon:'Home' },
  { label: "Library", path: "/library", icon:'LibraryBooks' },
  { label: "Data", path: "/library/data" }
];

function DemoCrumb({ items, navigation }: { items: CrumbItem[], navigation?: CrumbsProps['navigation'] }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Crumbs items={items} navigation={navigation} />
    </Paper>
  );
}

function CrumbsTest() {
  return (
    <Col gap={3}>
      <Typography variant="h5">Crumbs Basic Example</Typography>
      <DemoCrumb items={exampleCrumbItems} />

      <Typography variant="h6">Button Style Crumbs</Typography>
      <DemoCrumb items={exampleCrumbItems} navigation={{preferred: 'button', navigator: (path: string) => {alert('overriding navigating to ' + path)}}} />

      <Typography variant="h6">Longer Crumbs</Typography>
      <DemoCrumb
        navigation={{preferred: 'anchor'}}
        items={[
          ...exampleCrumbItems,
          { label: "Details", path: "/library/data/details" },
          { label: "Edit" },

        ]}
      />
    </Col>
  );
}

export default CrumbsTest;
