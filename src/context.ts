import { Config, getConfig } from "./config";
import React from "react";

export const DEFAULT_CONFIG:MuitilsConfig = getConfig();
export type MuitilsConfig = Config

export const MuitilsConfigProvider = React.createContext<MuitilsConfig>(DEFAULT_CONFIG);