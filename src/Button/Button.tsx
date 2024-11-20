import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress} from "@mui/material";
import Icon, {IconProps, IconName} from "../Icon";

type ButtonProps = MuiButtonProps & {
  /**@description if `true`, displays a loading spinner inside the button.*/
  loading?:boolean,
  /**@description text to display when the button is in a loading state.*/
  loadingText?: string,
  /**@description creates an <IconButton/> with the specified `IconName` or `IconProps` object*/
  Icon?:IconProps | IconName
}

/**
 * @description A wrapper around MUI's `Button` component with additional features.
 * @example
 * <Button loading loadingText="Loading..." Icon={faSpinner}/>
 */
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
