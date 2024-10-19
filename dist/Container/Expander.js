"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Row_1 = __importDefault(require("../Flex/Row"));
const Icon_1 = __importDefault(require("../Icon"));
const sx_1 = require("../sx");
const sx = (0, sx_1.createSx)({
    classes: ['expander_container', 'expanded'],
});
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
function Expander(props) {
    const { expanded, trigger, children, sx_container, sx_expanded, sx: _sx, onChange, className, ...rest } = props;
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(expanded ?? false);
    (0, react_1.useEffect)(() => {
        setIsExpanded(!!expanded);
    }, [expanded]);
    (0, react_1.useEffect)(() => {
        if (onChange)
            onChange(isExpanded);
    }, [isExpanded]);
    return ((0, jsx_runtime_1.jsxs)(Row_1.default, { className: [className, isExpanded ? sx.classes.expanded : ''].filter(x => x).join(' '), sx: sx(_sx, {
            width: '0%',
            minWidth: '50px',
            transition: '300ms',
            [sx.cls(sx.classes.expanded)]: {
                width: '100% !important'
            },
            [sx._cls(sx.classes.expander_container)]: {
                width: '0%',
                overflow: 'hidden',
                transition: '300ms ease-in',
                ...sx_container,
                [sx.cls(sx.classes.expanded)]: {
                    width: '100% !important',
                    ...sx_expanded
                }
            }
        }), ...rest, children: [trigger && (() => {
                if (typeof trigger === "string")
                    return ((0, jsx_runtime_1.jsx)(Icon_1.default, { name: trigger, button: { onClick: () => setIsExpanded(true), color: 'primary' } }));
                else {
                    const { button, ...rest } = trigger;
                    (0, jsx_runtime_1.jsx)(Icon_1.default, { ...rest, button: { onClick: () => setIsExpanded(true), color: 'primary', ...(typeof trigger.button === "boolean" ? {} : trigger.button) } });
                }
            })(), (0, jsx_runtime_1.jsx)(material_1.Box, { className: sx.classes.expander_container + (isExpanded ? ` ${sx.classes.expanded}` : ''), children: children })] }));
}
(function (Expander) {
    function Group(props) {
        const { children: _children, ...rest } = props;
        const [expanded, setExpanded] = (0, react_1.useState)(-1);
        const children = Array.isArray(_children) ? _children : [_children];
        return ((0, jsx_runtime_1.jsx)(Row_1.default, { ...rest, children: children.map((child, index) => {
                const itemProps = child.props;
                if (itemProps.expanded && expanded === -1)
                    setExpanded(index);
                return (0, jsx_runtime_1.jsx)(Expander, { ...itemProps, expanded: index === expanded, onChange: e => {
                        if (e)
                            setExpanded(index);
                    } });
            }) }));
    }
    Expander.Group = Group;
    function Item(props) {
        return (0, jsx_runtime_1.jsx)(Expander, { ...props });
    }
    Expander.Item = Item;
})(Expander || (Expander = {}));
exports.default = Expander;
