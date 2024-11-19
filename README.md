# MUITils

A library of useful Material UI component wrappers and utilities.

## Installation

## Usage

### Button
The `Button` component is a wrapper around MUI's `Button` component with additional features.
#### Props
- **loading**: `boolean` (optional)  
  If `true`, displays a loading spinner inside the button.
- **loadingText**: `string` (optional)  
  Text to display when the button is in a loading state.
- **Icon**: `IconProps | IconName` (optional)  
  An icon to display inside the button. Can be an `IconProps` object or an `IconName` string.
- **...rest**: `MuiButtonProps`  
  All other props are passed to the underlying MUI `Button` component.

### Icon
The `Icon` component is a wrapper around MUI's `Icon` component with additional features.
#### Props
- **name**: `IconName`  
  The name of the icon to display.
- **button**: `boolean` (optional)  
  If `true`, the icon will be styled for use in a button.
- **...rest**: `IconProps`  
  All other props are passed to the underlying MUI `Icon` component.

