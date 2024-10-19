import * as React from 'react';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { Button, ButtonProps } from './Button';

type ButtonPopupProps = Omit<ButtonProps, "onClick"> & {
  Menu?: Omit<MuiMenuProps, "children" | "onClose">
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
    <div>
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
    </div>
  );
}

export {
  type ButtonPopupProps,
  ButtonPopup
}

export default ButtonPopup;