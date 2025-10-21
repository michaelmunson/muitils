import { useContext } from "react";
import { MuitilsClient, DEFAULT_CONFIG, type MuitilsConfig } from "./context";
import {deepMerge} from "./utils";

export const useMuitilsConfig = () => { 
  const config = useContext(MuitilsClient);
  return deepMerge(DEFAULT_CONFIG, config) as MuitilsConfig;
}