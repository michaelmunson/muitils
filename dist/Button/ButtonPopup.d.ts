import { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { ButtonProps } from './Button';
type ButtonPopupProps = Omit<ButtonProps, "onClick"> & {
    Menu?: Omit<MuiMenuProps, "children" | "onClose">;
};
declare function ButtonPopup(props: ButtonPopupProps): import("react/jsx-runtime").JSX.Element;
export { type ButtonPopupProps, ButtonPopup };
export default ButtonPopup;
