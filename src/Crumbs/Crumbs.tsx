import { Breadcrumbs, Link, Skeleton } from "@mui/material";
import { Row } from "../Flex";
import { Icon } from "../Icon";
import React from "react";
import { CrumbItem, CrumbsProps } from "./types";
import { useMuitilsConfig } from "../hooks";
import crumbsSx, { styles } from "./sx";

export function CrumbLink(props:CrumbItem){
  const {label, icon, path, navigation={preferred: 'anchor'}, LinkProps:_LinkProps={}, WrapperProps, loading, SkeletonProps} = props;
  const {className, ...LinkProps} = _LinkProps;
  const isLoading = loading ?? (path === undefined && ('path' in props));
  const isAnchor = typeof path === 'string';
  const component = LinkProps?.component ?? (typeof path === 'string' ? 'a' : 'button');
  const navProps = isAnchor ? (
    navigation?.preferred === 'button' ? {onClick:() => navigation.navigator(path)} : {href:path}
  ) : {onClick:path};
  const LinkIcon = () => icon ? (
    typeof icon === 'string' ? <Icon name={icon}/> : <Icon {...icon}/>
  ) : null;

  if (isLoading) return <Skeleton variant="text" width={100} height={20} {...SkeletonProps} />;

  return (
    <Row gap={!!LinkIcon ? 1 : 0} {...WrapperProps}>
      <LinkIcon/>
      <Link underline="hover" disabled={!path} component={component} {...navProps} {...LinkProps} className={[!path ? crumbsSx.classes.muitils_disabled_crumb : '', className].filter(Boolean).join(' ')}>
        {label}
      </Link>
    </Row>
  )
}

export function Crumbs(props:CrumbsProps){
  const muitilsConfig = useMuitilsConfig();
  const sxConfig = muitilsConfig.Crumbs?.sx ?? {} as any;
  const navigation = muitilsConfig.Crumbs?.navigation ?? {preferred: 'anchor'};
  const {items, navigation: navigationProps, sx, ...rest} = props;

  return (
    <Breadcrumbs aria-label="breadcrumb" {...rest} sx={crumbsSx(styles(), sxConfig, sx)}>
    {items.map((item, index) => (
      <CrumbLink key={`nav-crumb-${index}`} {...item} navigation={navigationProps ?? navigation} />
    ))}
  </Breadcrumbs>
  )
}