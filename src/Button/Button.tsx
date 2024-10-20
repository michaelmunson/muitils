import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress} from "@mui/material";
import Icon, {IconProps, IconName} from "../Icon";
import { ButtonPopup } from "./ButtonPopup";

type ButtonProps = MuiButtonProps & {loading?:boolean, loadingText?: string, Icon?:IconProps | IconName}

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

export {
  type ButtonProps,
  Button
}

export default Button;
