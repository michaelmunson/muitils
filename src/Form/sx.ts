import { getConfig } from '../config';
import {createSx, mergeSx} from '../sx';

const formSx = createSx({
  classes: ['form_input_row', 'submit_button'] as const,
});

export const styles = () => (
  mergeSx([
    formSx({
      '& .form_input_row' : {
        width: '100%',
        gap: 2,
      },
      '& .submit_button' : {borderRadius: '20px', width: '200px', fontWeight:'bold', fontSize: '1.1rem', mt:2}
    }),
    getConfig().Form.sx
  ], {merge: 'deep'})
)

export default formSx;
