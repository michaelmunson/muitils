import { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { ButtonProps } from '.';
export type ButtonPopupProps = Omit<ButtonProps, "onClick"> & {
    Menu?: Omit<MuiMenuProps, "children" | "onClose">;
};
export default function ButtonPopup(props: ButtonPopupProps): import("react/jsx-runtime").JSX.Element;
