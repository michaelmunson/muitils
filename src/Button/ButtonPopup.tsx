import * as React from 'react';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { Button, ButtonProps } from './Button';
import { Box } from '@mui/material';

/**
 * @description A wrapper around MUI's `Button` component that creates a popup menu when clicked.
 * @example
 * <ButtonPopup Menu={{sx:{p:2}}} variant="contained">
 *   <MenuList>
 *     <MenuItem>Item 1</MenuItem>
 *     <MenuItem>Item 2</MenuItem>
 *   </MenuList>
 * </ButtonPopup>
 */
type ButtonPopupProps = Omit<ButtonProps, "onClick"> & {
  /**@description props to pass to the <MuiMenu/> component*/
  Menu?: Omit<MuiMenuProps, "children" | "onClose">;
}

function ButtonPopup(props: ButtonPopupProps) {
  const { children, Menu, ...rest } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        {...rest}
        onClick={handleClick}
      />
      <MuiMenu
        {...Menu}
        sx={{
          '.MuiPaper-root': {
            p: 1,
            borderRadius: '10px !important',
            border: '1px solid gray'
          },
          ...Menu?.sx
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

      >
        {children}
      </MuiMenu>
    </>
  );
}

export {
  type ButtonPopupProps,
  ButtonPopup
}

export default ButtonPopup;