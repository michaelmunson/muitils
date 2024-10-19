import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress} from "@mui/material";
import Icon from "../Icon";
import ButtonPopup from "./ButtonPopup";

type ButtonProps = MuiButtonProps & {loading?:boolean, loadingText?: string, Icon?:Icon.Props | Icon.IconName}

function Button(props:ButtonProps) {
  const {Icon:icon, loading, loadingText,...rest} = props;

  if (icon && typeof icon === "string") return (
    <Icon name={icon} button={rest}/>
  )

  else if (icon) return (
    <Icon {...icon} button={rest}/>
  )
  
  return (
    loading ? (
      <MuiButton variant={props.variant ?? "contained"} {...rest} disabled>
        <CircularProgress sx={{width: '20px !important', height: '20px !important', mr:1}}/>
        {loadingText ?? rest.children}
      </MuiButton>
    ) : (
      <MuiButton variant={props.variant ?? "contained"} {...rest}/>
    )
  )
}

namespace Button {
  export type Props = ButtonProps;
  export const Popup = ButtonPopup;
}

export {
  type ButtonProps,
  ButtonPopup
}
export default Button
