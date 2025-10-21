import { BreadcrumbsProps, LinkProps, SkeletonProps } from "@mui/material";
import { RowProps } from "../Flex";
import { IconName, IconProps } from "../Icon";
import React from "react";

export type CrumbItem = {
  /**@description if `true`, displays a skeleton instead of the link.*/
  loading?: boolean;
  /**@description the label to display in the link.*/
  label:React.ReactNode; 
  /**@description the icon to display in the link.*/
  icon?: IconName | IconProps,
  /**@description the path to navigate to when the link is clicked.*/
  path?: string | (() => any), 
  /**@description the props to pass to the MUI `<Link/>` component.*/
  LinkProps?: LinkProps
  /**@description the props to pass to the `<Row/>` component that wraps the link.*/
  WrapperProps?: RowProps
  /**@description the navigation to use for the link.*/
  navigation?: CrumbsProps['navigation']
  /**@description the props to pass to the MUI `<Skeleton/>` component that displays when the link is loading.*/
  SkeletonProps?: SkeletonProps
}

export type CrumbsProps= BreadcrumbsProps & {
  items: CrumbItem[];
  navigation?: {
    preferred: 'anchor'
  } | {
    preferred: 'button'
    navigator: (path:string) => void;
  }
}
