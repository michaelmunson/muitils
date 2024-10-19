import { IconButtonProps, SvgIconProps } from '@mui/material';
import * as MuiIcons from "@mui/icons-material";
type IconName = keyof typeof MuiIcons;
type IconProps = SvgIconProps & {
    name: IconName;
    button?: boolean | IconButtonProps;
};
declare function Icon(props: IconProps): JSX.Element;
export { type IconName, type IconProps, Icon };
export default Icon;
