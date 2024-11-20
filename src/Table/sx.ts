import { getConfig } from '../config';
import {createSx, mergeSx} from '../sx';

const tableSx = createSx({
  classes: <const>[
    'table',
    'table_head',
    'table_body',
    'table_row',
    'table_cell',
  ]
});

const styles = () => {
  const configSx = getConfig().Table.sx;
  const defaultSx = tableSx({
    maxHeight: '80vh',
    scrollBehavior: 'smooth',
    '& .table' : {
      minWidth: 450,
    },
    '& .table_head' : { 
      background: '#ededed !important', 
      '& th': {
        background: '#717171 !important', 
        color:'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
    },
    [tableSx.$('& .table_body', ' .table_row')] : {
      cursor: 'pointer',
      '&:last-child td, &:last-child th': { border: 0 }
    }
  });

  return mergeSx([defaultSx, configSx], {merge: 'deep'});
}

export {styles};
export default tableSx;
