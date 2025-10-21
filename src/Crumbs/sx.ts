import { getConfig } from '../config';
import {createSx, mergeSx} from '../sx';

const crumbsSx = createSx({
  classes: ['muitils_disabled_crumb'] as const,
});

export const styles = () => (
  mergeSx([
    crumbsSx({
      '& .muitils_disabled_crumb': {
      color: 'text.secondary',
      textDecoration: 'none',
      cursor: 'default',
      pointerEvents: 'none',
    }
    }),
    getConfig().Crumbs.sx
  ], {merge: 'deep'})
)

export {crumbsSx}

export default crumbsSx;
