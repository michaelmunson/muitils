import { useContext } from "react";
import { MuitilsClient, DEFAULT_CONFIG, type MuitilsConfig } from "./context";
import {deepMerge} from "./utils";
import { getConfig } from "./config";

export const useMuitilsConfig = () => { 
  let config = useContext(MuitilsClient);
  if (!config) config = getConfig();
  return deepMerge(DEFAULT_CONFIG, config) as MuitilsConfig;
}