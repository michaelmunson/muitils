import { ButtonProps as MuiButtonProps } from "@mui/material";
import Icon from "../Icon";
import ButtonPopup from "./ButtonPopup";
type ButtonProps = MuiButtonProps & {
    loading?: boolean;
    loadingText?: string;
    Icon?: Icon.Props | Icon.IconName;
};
declare function Button(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
declare namespace Button {
    type Props = ButtonProps;
    const Popup: typeof ButtonPopup;
}
export { type ButtonProps, ButtonPopup };
export default Button;
