import * as MuiIcons from "@mui/icons-material"
import { IconButton, IconButtonProps, SvgIconProps } from "@mui/material"

type IconName = keyof typeof MuiIcons;
type IconProps = SvgIconProps & { 
    name: IconName;
    button?:boolean | IconButtonProps
}

/**
 * @description A wrapper around MUI's Icon components with additional features.
 * @example
 * ```tsx
 * // simple icon
 * <Icon name="Add" />
 * ```
 * @example
 * ```tsx
 * // icon button
 * <Icon name="Add" button />
 * ```
 * @example
 * ```tsx
 * // icon button with custom props
 * <Icon name="Add" button={{sx:{p:2}}} />
 * ```
 */
function Icon(props: IconProps) : JSX.Element {
    const { name, button, ...rest } = props;
    const i = MuiIcons[name] as any;

    if (button) {
        const buttonProps = typeof button === "boolean" ? {} : button;
        return (
            <IconButton {...buttonProps}>
                {i.type.render(rest)}
            </IconButton>
        )
    }

    return (
        i.type.render(rest)
    )
}

export {
    type IconName,
    type IconProps
}

export default Icon
