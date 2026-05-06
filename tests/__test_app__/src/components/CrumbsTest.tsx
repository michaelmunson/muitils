import { Col } from "../../../../src/Flex";
import Crumbs, { CrumbItem, CrumbsProps } from "../../../../src/Crumbs";
import { Typography, Paper } from "@mui/material";
import { Icon } from "../../../../src/Icon";

const exampleCrumbItems: CrumbItem[] = [
  { label: "Home", path: "/", icon: 'Home' },
  { label: "Library", path: "/library", icon: 'LibraryBooks' },
  { label: "Data", path: "/library/data" },
];

function DemoCrumb(props: CrumbsProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Crumbs {...props} />
    </Paper>
  );
}

function CrumbsTest() {
  return (
    <Col gap={3}>
      <Typography variant="h5">Crumbs Basic Example</Typography>
      <DemoCrumb items={exampleCrumbItems} />

      <Typography variant="h6">Button Style Crumbs</Typography>
      <DemoCrumb items={exampleCrumbItems} navigation={{ preferred: 'button', navigator: (path: string) => { alert('overriding navigating to ' + path) } }} />

      <Typography variant="h6">Longer Crumbs</Typography>
      <DemoCrumb
        navigation={{ preferred: 'anchor' }}
        items={[
          ...exampleCrumbItems,
          { label: "Details", path: "/library/data/details" },
          { label: "Edit" },

        ]}
      />

      <Typography variant="h6">Custom Crumb</Typography>
      <DemoCrumb
        CrumbProps={{
          LinkProps: {
            sx: {color: 'red !important'},
          }
        }}
        items={[
          {
            LinkProps: {
              sx: {cursor: 'pointer'},
              onClick: () => {
                alert('home');
              }
            },
            label: <>
              <Icon
                name={'Home'}
                sx={{ mb: -0.5 }}
              />
            </>,
            path: null as any
          },
          {
            label: 'Library',
          }
        ]}
      />
    </Col>
  );
}

export default CrumbsTest;
