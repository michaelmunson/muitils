import { MuiSxProps, SxConfig, SxConfigPart, SxConfigDefault, SxConfigMerge, SxFunction, SxExtensions, SxArgs, Sx } from "./types";
import { deepMerge, shallowMerge } from "../internal.utils";

const DEFAULT_CONFIG: SxConfig = {
  classes: [] as const,
  definitions: {} as const,
}

// const isElementSelector = (selector: any): selector is ElementRestSelector => typeof selector === 'string' && letters.includes(selector[0]);
// const isClass = <Config extends SxConfig>(config: Config, cls: any): cls is Config['classes'][number] => (
//   typeof cls === "string" && config.classes.includes(cls)
// );
// const isClassSelector = (selector: any): selector is ClassSelector => typeof selector === 'string' && selector.startsWith('.');

const isDefinition = <Config extends SxConfig>(config: Config, str: any): str is keyof Config['definitions'] => (
  typeof str === "string" && str in config['definitions']
);

/**@_UTILS */
const createConfig = <Config extends SxConfigPart>(config: Config): SxConfigDefault<Config> => ({ ...DEFAULT_CONFIG, ...config }) as any;

function createSxFunction<Config extends SxConfig>(config: Config): SxFunction<Config> {
  const definitions: Config['definitions'] = config.definitions;
  return (...styles) => {
    const muisx: MuiSxProps = {};
    const assignStyle = (style: SxArgs<Config>[number]) => {
      if (!style) return;
      if (isDefinition(config, style)) {
        Object.assign(muisx, definitions[style])
      }
      else if (Array.isArray(style)) style.forEach(s => assignStyle(s));
      else if (typeof style === 'object') Object.assign(muisx, style);
    }
    for (const style of styles) {
      assignStyle(style);
    }
    return muisx;
  }
}

function createSxExtensions<Config extends SxConfig<object>>(config: Config): SxExtensions<Config> {
  return <const>{
    classes: config.classes.reduce((p, c) => ({ ...p, [c]: c }), {}) as Readonly<{ [K in Config["classes"][number]]: K; }>,
    definitions: config.definitions,
    cls(...className) {
      return `&.${className.join('.')}`;
    },
    _cls(...className) {
      return `& .${className.join(' .')}`;
    },
    el(...elements) {
      return `& ${elements.join('') as `${keyof HTMLElementTagNameMap}${string}`}`
    },
    hov(modifier = "") {
      return `&${modifier}:hover`
    },
    def(...definitionArray) {
      const definitions: Config['definitions'] = config.definitions;
      const extractedDefinitions: any = {};
      for (const def of definitionArray){
        if (!isDefinition(config, def)) {
          console.warn(`Warning: "${def.toString()}" is not defined in Muitils SxConfig`);
          continue;
        }
        Object.assign(extractedDefinitions, definitions[def]);
      }
      return extractedDefinitions;
    },
    $(...selectors) {
      const [firstSelector, ...nextSelectors] = selectors;
      return `${firstSelector} ${nextSelectors.join('')}`.trim();
    },
  }
}

/**
 * @description Creates a Sx function with extensions
 * @importing
 * ```tsx
 * import {createSx} from 'muitils'
 * // or
 * import {createSx} from 'muitils/sx'
 * ```
 * <br><hr><br>
 * @example 
 * ```tsx
 * const sx = createSx({
 *  classes: ['section','container'] as const,
 *  definitions:{
 *    w100: {width:'100%'},
 *    h100: {height:'100%'}
 *  } as const,
 * });
 * 
 * const boxSx = sx({
 *    ...sx.def('w100','h100'),
 *    [sx.$('& .section')]: {
 *      p: 2
 *    }
 * })
 * 
 * const box = <Box sx={boxSx} />
 * ```
 */
export function createSx<Config extends SxConfigPart>(configuration: Config = ({} as Config)): Sx<SxConfig<Config>> {
  const config = createConfig(configuration);
  const sxFunction = createSxFunction(config);
  const sxExtensions = createSxExtensions(config);
  Object.assign(sxFunction, sxExtensions);
  return sxFunction as Sx<SxConfig<Config>>; 
}

/**
 * @description Extends a Sx function with new configuration
 * @importing
 * ```tsx
 * import {extendSx} from 'muitils'
 * // or
 * import {extendSx} from 'muitils/sx'
 * ```
 * <br><hr><br>
 * @example
 * ```tsx
 * const rootSx = createSx({
 *  classes: ['form', 'field'] as const,
 *  definitions:{
 *    w100: {width:'100%'},
 *    h100: {height:'100%'}
 *  } as const,
 * })
 * 
 * const sx = extendSx(rootSx,{
 *  classes: ['input'] as const,
 *  definitions:{
 *    input: {
 *      border: '1px solid red'
 *    }
 *  } as const,
 * })
 * 
 * const boxSx = sx({
 *   ...sx.def('w100','input'),
 *   [sx.$('& .field')]: {
 *     p: 2
 *   }
 * })
 * 
 * const form = (
 *  <Box sx={boxSx}>
 *    <TextField className={sx.classes.field}/>
 *  </Box>
 * )
 * 
 * ```
 */
export function extendSx<SxExtendee, ExtConfig extends SxConfigPart>(
  sx: SxExtendee,
  config: ExtConfig
): SxExtendee extends Sx<infer Config> ? SxConfigMerge<Config, ExtConfig> : never {
  const SX = sx as Sx;
  const CF = { ...DEFAULT_CONFIG, ...config }
  const classes: any = [Object.values(SX.classes), Object.values(CF.classes)].flat();
  const definitions: any = { ...SX?.definitions, ...CF.definitions };
  return createSx({
    classes,
    definitions
  }) as any
}

/**
 * @description Merges an array of MuiSxProps
 * @importing
 * ```tsx
 * import {mergeSx} from 'muitils'
 * // or
 * import {mergeSx} from 'muitils/sx'
 * ```
 * <br><hr><br>
 * @example
 * ```tsx
 * const merged = mergeSx([sx1,sx2], {merge: 'deep'})
 * ```
 * @example
 * ```tsx
 * const merged = mergeSx([sx1,sx2,sx3,sx4], {merge: 'shallow'})
 * ```
 */

export function mergeSx(sx: (MuiSxProps<any> | undefined | null)[], config:{merge: 'deep' | 'shallow'} = {merge: 'deep'}) : Exclude<MuiSxProps, undefined | null> {
  return sx.filter(Boolean).reduce((p, c) => config.merge === 'deep' ? deepMerge(p, c) : shallowMerge(p, c), {}) as any;
}

export type * from './types';
