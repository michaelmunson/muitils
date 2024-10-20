import { type StackProps } from "@mui/material";
import {CSSProperties} from "react";

export type CSSDirection = Exclude<Exclude<CSSProperties['flexDirection'], undefined>, "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset">

export type Dimension = 'x'|'y'

export type LayoutDimension = Dimension | Dimension[]

export type Layout = LayoutCol | LayoutRow
export type LayoutCol = Partial<{
  x?: CSSProperties['alignItems']
  y?: CSSProperties['justifyContent'],
}>
export type LayoutRow = Partial<{
  y: CSSProperties['alignItems']
  x: CSSProperties['justifyContent'],
}>

export type DefaultProps = Omit<StackProps, "direction"|"flexDirection"> & Partial<{
  center: LayoutDimension
  reverse: boolean
}>

export type RowProps = DefaultProps & Partial<{
  row:boolean
  layout: LayoutRow
}>

export type ColProps = DefaultProps & Partial<{
  col:boolean
  layout: LayoutCol
}>

export type FlexProps = RowProps | ColProps

/* 

export type DirectionedProps = ({reverse?:boolean} & {row?:boolean} | {col?:boolean}) | (StackProps['direction'] & StackProps['flexDirection'])
export type DirectionlessStackProps = Omit<StackProps, "direction"|"flexDirection">

export type PropExtensions = Partial<{
  center: LayoutDimension
}>

export type DirectionlessFlexProps = StackProps & PropExtensions;


export type RowProps = DirectionlessFlexProps & Partial<{
  layout: LayoutRow
}>

export type ColProps = DirectionlessFlexProps & Partial<{
  layout: LayoutCol
}> */