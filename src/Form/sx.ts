import { getConfig } from '../config';
import {createSx, mergeSx} from '../sx';

const formSx = createSx({
  classes: ['form_input_row'] as const,
});

export const styles = () => (
  mergeSx([
    formSx({
      '& .form_input_row' : {
        width: '100%',
        gap: 2,
      }
    }),
    getConfig().Form.sx
  ], {merge: 'deep'})
)

export default formSx;
