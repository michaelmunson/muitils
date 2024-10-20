import { ColProps, RowProps, FlexProps, CSSDirection } from "./types";
import { CSSProperties } from "react";

export function isRow(props:FlexProps) : props is RowProps {
  return (!isCol(props))
}

export function isCol(props:FlexProps) : props is ColProps {
  return ('col' in props)
}

export function getLayout(props:FlexProps) : Pick<CSSProperties, 'justifyContent'|'alignItems'> {
  const layout = props.layout ?? {};
  const css:CSSProperties = {};
  if (props.center){
    const center = Array.isArray(props.center) ? props.center : [props.center];
    if (center.includes('x'))
        layout.x = 'center'
    if (center.includes('y'))
        layout.y = 'center'
  }

  if (isRow(props)){
    css.alignItems = layout.y ?? 'initial';
    css.justifyContent = layout.x ?? 'initial';
  }
  else {
    css.alignItems = layout.x ?? 'initial';
    css.justifyContent = layout.y ?? 'initial';
  }

  return css;
}

export function getDirection(props:FlexProps) : CSSDirection {
  if (isRow(props)){
    if (props.reverse) return 'row-reverse'
    else return 'row'
  }
  else {
    if (props.reverse) return 'column-reverse'
    else return 'column'
  }
}
