import { CrumbsProps } from "./Crumbs";
import React from "react";

export const DEFAULT_CONFIG:MuitilsConfig = {
  Crumbs: {
    navigation: {
      preferred: 'anchor'
    }
  }
}

export type MuitilsConfig = {
  Crumbs?:Pick<CrumbsProps, 'navigation'>
}

export const MuitilsConfigProvider = React.createContext<MuitilsConfig>(DEFAULT_CONFIG);