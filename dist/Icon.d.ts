import * as MuiIcons from "@mui/icons-material";
import { IconButtonProps, SvgIconProps } from "@mui/material";
declare function Icon(props: Icon.Props): JSX.Element;
declare namespace Icon {
    type IconName = keyof typeof MuiIcons;
    type Props = SvgIconProps & {
        name: IconName;
        button?: boolean | IconButtonProps;
    };
}
export default Icon;
