import * as MuiIcons from "@mui/icons-material"
import { IconButton, IconButtonProps, SvgIconProps } from "@mui/material"

type IconName = keyof typeof MuiIcons;
type IconProps = SvgIconProps & { 
    name: IconName;
    button?:boolean | IconButtonProps
}

/**
 * @description A wrapper around MUI's Icon components with additional features.
 * @importing
 * ```tsx
 * import {Icon} from 'muitils'
 * // or
 * import Icon from 'muitils/Icon'
 * ```
 * <br><hr><br>
 * @example
 * creates a `<SvgIcon/>` component
 * ```tsx
 * <Icon name="Add" />
 * ```
 * @example
 * creates an `<IconButton/>` component
 * ```tsx
 * <Icon name="Add" button />
 * ```
 * @example
 * `IconButton` with custom props
 * ```tsx
 * <Icon name="Add" button={{onClick:()=>alert('clicked')}} />
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
