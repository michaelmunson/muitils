import { useContext } from "react";
import { MuitilsConfigProvider, DEFAULT_CONFIG, type MuitilsConfig } from "./context";
import {deepMerge} from "./utils";

export const useMuitilsConfig = () => { 
  const config = useContext(MuitilsConfigProvider);
  return deepMerge(DEFAULT_CONFIG, config) as MuitilsConfig;
}