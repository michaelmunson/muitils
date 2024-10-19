import { useEffect, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import Row, { RowProps } from '../Flex/Row';
import Icon from '../Icon';
import sx from '../sx';

const cls = sx.classes('expander_container', 'expanded');

export type ExpanderProps = Omit<RowProps, "onChange"> & {
  trigger?: Icon.IconName | Icon.Props;
  expanded?: boolean;
  sx_container?: SxProps;
  sx_expanded?: SxProps;
  onChange?: (expanded: boolean) => void
}

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
function Expander(props: ExpanderProps) {
  const { expanded, trigger, children, sx_container, sx_expanded, sx: _sx, onChange, className, ...rest } = props;
  const [isExpanded, setIsExpanded] = useState(expanded ?? false);

  useEffect(() => {
    setIsExpanded(!!expanded);
  }, [expanded]);

  useEffect(() => {
    if (onChange) onChange(isExpanded);
  }, [isExpanded])

  return (
    <Row className={[className, isExpanded ? cls.expanded : ''].filter(x => x).join(' ')} sx={sx(_sx, {
      width: '0%',
      minWidth: '50px',
      transition: '300ms',
      [sx.cls(cls.expanded)]: {
        width: '100% !important'
      },
      [sx._cls(cls.expander_container)]: {
        width: '0%',
        overflow: 'hidden',
        transition: '300ms ease-in',
        ...(sx_container as any),
        [sx.cls(cls.expanded)]: {
          width: '100% !important',
          ...(sx_expanded as any)
        }
      }
    })} {...rest}>
      {trigger && (() => {
        if (typeof trigger === "string") return (
          <Icon name={trigger} button={{ onClick: () => setIsExpanded(true), color: 'primary' }} />
        );
        else {
          const { button, ...rest } = trigger;
          <Icon {...rest} button={{ onClick: () => setIsExpanded(true), color: 'primary', ...(typeof trigger.button === "boolean" ? {} : trigger.button) }} />
        }
      })()}
      <Box className={cls.expander_container + (isExpanded ? ` ${cls.expanded}` : '')}>
        {children}
      </Box>
    </Row>
  )
}

namespace Expander {
  type ExpanderGroupProps = Omit<RowProps, "onChange">;

  export function Group(props: ExpanderGroupProps) {
    const { children: _children, ...rest } = props;
    const [expanded, setExpanded] = useState(-1);
    const children = Array.isArray(_children) ? _children : [_children];

    return (
      <Row {...rest}>
        {children.map((child, index) => {
          const itemProps = child.props;
          if (itemProps.expanded && expanded === -1) setExpanded(index)
          return <Expander {...itemProps} expanded={index === expanded} onChange={e => {
            if (e) setExpanded(index);
          }} />
        })}
      </Row>
    )
  }

  export function Item(props: ExpanderProps) {
    return <Expander {...props} />
  }
}

export default Expander;

