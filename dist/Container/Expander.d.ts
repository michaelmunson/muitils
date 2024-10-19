import { SxProps } from '@mui/material';
import { RowProps } from '../Flex/Row';
import { IconName, IconProps } from '../Icon';
type ExpanderProps = Omit<RowProps, "onChange"> & {
    trigger?: IconName | IconProps;
    expanded?: boolean;
    sx_container?: SxProps;
    sx_expanded?: SxProps;
    onChange?: (expanded: boolean) => void;
};
/**
 * @example
 * <Expander.Group sx={{ mb: 2, mt: 4 }} layout={{ x: 'flex-end' }}>
      <Expander.Item trigger={'Search'}>
        <TextField placeholder="Search Opportunities" fullWidth variant={'standard'} value={filter} onChange={e => setFilter(e.target.value)} />
      </Expander.Item>
      <Expander.Item center={'y'} trigger="FilterList" expanded={true} sx_container={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
        {(['active', 'past', 'other'] as const).map((t, i) => (
          <Chip color="primary" key={`${t}-${i}-chip`} sx={{ textTransform: 'capitalize' }} label={t} variant={types.includes(t) ? 'filled' : 'outlined'} onClick={() => setSearch(sp => ({ ...sp, filter: { status: types.includes(t) ? [...types.filter(a => a !== t)] : [...types, t] } }))} />
        ))}
      </Expander.Item>
  </Expander.Group>
 */
declare function Expander(props: ExpanderProps): import("react/jsx-runtime").JSX.Element;
declare namespace Expander {
    type ExpanderGroupProps = Omit<RowProps, "onChange">;
    export function Group(props: ExpanderGroupProps): import("react/jsx-runtime").JSX.Element;
    export function Item(props: ExpanderProps): import("react/jsx-runtime").JSX.Element;
    export {};
}
export { type ExpanderProps, Expander };
