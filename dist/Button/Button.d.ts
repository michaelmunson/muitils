import { ButtonProps as MuiButtonProps } from '@mui/material';
import { IconProps, IconName } from '../Icon';
import { ButtonPopup } from './ButtonPopup';
type ButtonProps = MuiButtonProps & {
    loading?: boolean;
    loadingText?: string;
    Icon?: IconProps | IconName;
};
declare function Button(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
declare namespace Button {
    type Props = ButtonProps;
    const Popup: typeof ButtonPopup;
}
export { type ButtonProps, Button };
export default Button;
