import * as MuiIcons from "@mui/icons-material"
import { IconButton, IconButtonProps, SvgIconProps } from "@mui/material"

function Icon(props: Icon.Props) : JSX.Element {
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

namespace Icon {
    export type IconName = keyof typeof MuiIcons
    export type Props = SvgIconProps & { 
        name: IconName;
        button?:boolean | IconButtonProps
    }
}

export default Icon
