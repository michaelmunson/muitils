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

### Flex
The `Flex` component is a wrapper around MUI's `Stack` component that provides an easier way to create flexible layouts.

#### Props
- **col**: `boolean` (optional)  
  If `true`, arranges children in a column layout.
- **row**: `boolean` (optional)  
  If `true`, arranges children in a row layout.
- **center**: `"x" | "y" | Array<"x" | "y">` (optional)  
  If `true`, centers the content both horizontally and vertically.
- **layout**: `{x?:flexLayout, y?:flexLayout}` (optional)  
  The layout of the flex container.
- **...rest**: `StackProps`  
  All other props are passed to the underlying MUI `Stack` component.

### Row
The `Row` component is a pre-configured `Flex` component that arranges children horizontally.

#### Props
- **center**: `boolean` (optional)  
  If `true`, centers the content both horizontally and vertically.
- **...rest**: `StackProps`  
  All other props are passed to the underlying MUI `Stack` component.

### Col
The `Col` component is a pre-configured `Flex` component that arranges children vertically.

#### Props
- **center**: `boolean` (optional)  
  If `true`, centers the content both horizontally and vertically.
- **...rest**: `StackProps`  
  All other props are passed to the underlying MUI `Stack` component.
