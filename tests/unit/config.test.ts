import {describe, expect, test} from '@jest/globals';
import {getConfig, setConfig} from '../../src/config';
import {styles as formStyles} from '../../src/Form/sx';
import {styles as tableStyles} from '../../src/Table/sx';
describe('config', () => {
  test('getConfig', () => {
    const config = getConfig();
    expect(config).toHaveProperty('Form');
    expect(config).toHaveProperty('Table');
  });
  test('setConfig - Form', () => {
    setConfig({
      Form: {
        sx: {
         '& .form_input_row' : {
            display: 'flex',
            flexDirection: 'row',
            gap: 2
         },
         '& .random' : {
          color: 'red'
         }
        },
        transform: (form:JSX.Element) => form
      },
    });
    const config = getConfig();
    expect(config.Form.sx['& .form_input_row']).toHaveProperty('display');
    const styles = formStyles()
    expect(Boolean((styles as any)['& .form_input_row']))
    expect(Boolean((styles as any)['& .random']))
    expect(config.Form.transform).toBeDefined();
    expect(Boolean((styles as any)['& .submit_button']))
  });
  test('setConfig - Table', () => {
    setConfig({
      Table: {
        sx: {
          '& .table_row': {
            backgroundColor: 'red'
          }
        }
      }
    })
    const config = getConfig();
    expect(config.Table.sx['& .table_row']).toHaveProperty('backgroundColor');
    const styles = tableStyles();
    expect(Boolean((styles as any)['& .table_row']))
    expect(Boolean((styles as any)['& .table_row']['backgroundColor']))
  })
});
