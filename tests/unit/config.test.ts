import {describe, expect, test} from '@jest/globals';
import {getConfig, setConfig} from '../../src/config';

describe('config', () => {
  test('getConfig', () => {
    const config = getConfig();
    expect(config).toHaveProperty('Form');
  });
  test('setConfig', () => {
    setConfig({
      Form: {
        sx: {
         classes : {
            'form_input_row': {
              display: 'flex',
              flexDirection: 'row',
              gap: 2
            }
          }
        },
        transform: (form:JSX.Element) => form
      }
    });
    const config = getConfig();
    expect(config.Form.sx.classes['form_input_row']).toHaveProperty('display');
  });
});
