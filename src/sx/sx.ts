import { SxProps as MuiSxProps } from "@mui/material"

const DEFAULT_CONFIG: SxConfig = {
  classes: [] as const,
  definitions: {} as const,
}

/**@_TYPES */
type CombineArrays<T extends readonly any[], U extends readonly any[]> = readonly [...T, ...U];
// const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const cssOperator = <const>['+', '>', ',', '&', '& >', ' '];
type CSSOperator = (typeof cssOperator)[number];
type OperatorSelectors<O extends CSSOperator | `${CSSOperator} `, T extends readonly any[]> = {
  [K in keyof T] : `${O}${T[K]}`
}
type Elements = readonly (keyof HTMLElementTagNameMap)[];
type ClassList = readonly string[];
type ClassListSelectors<T extends ClassList> = {
  [K in keyof T]: `.${T[K]}`
}
type ClassListFirstSelectors<T extends ClassList> = (
  OperatorSelectors<'&', ClassListSelectors<T>> |
  OperatorSelectors<'& ', ClassListSelectors<T>>|
  OperatorSelectors<'& > ', ClassListSelectors<T>>
)
type ClassListRestSelectors<T extends ClassList> = (
  ClassListSelectors<T> |
  OperatorSelectors<' ', ClassListSelectors<T>> |
  OperatorSelectors<'+ ', ClassListSelectors<T>> |
  OperatorSelectors<'> ', ClassListSelectors<T>>|
  OperatorSelectors<', ', ClassListSelectors<T>> 
)

type ElementFirstSelector = OperatorSelectors<'& ', Elements>[number]

type ElementRestSelector = (
  OperatorSelectors<'+ ', (keyof HTMLElementTagNameMap)[]> |
  OperatorSelectors<'> ', (keyof HTMLElementTagNameMap)[]> |
  OperatorSelectors<', ', (keyof HTMLElementTagNameMap)[]> 
)[number]

type ClassEnums<T extends ClassList> = Readonly<{ [K in T[number]]: K }>
type DefinitionValue<Args extends any[] = any[]> = MuiSxProps | ((...args: Args) => MuiSxProps)
type DefinitionRecord = Readonly<Record<string, DefinitionValue>>

/*****@sx_config */
type SxConfig = {
  classes: ClassList;
  definitions: DefinitionRecord;
}
type SxConfigPart = Partial<SxConfig>

type SxConfigDefault<Config extends SxConfigPart> = {
  [K in keyof SxConfig]: Exclude<Config[K] extends undefined ? SxConfig[K] : Config[K], undefined>
}

type SxConfigMerge<Config extends SxConfig, ExtConfig extends SxConfigPart> = (
  Sx<{
    classes: CombineArrays<Config['classes'], SxConfigDefault<ExtConfig>['classes']>;
    definitions: SxConfigDefault<ExtConfig>['definitions'] & Config['definitions'];
  }>
)

type SxConfigClass<Config extends SxConfig> = Config['classes'][number];
type SxFirstSelector<Config extends SxConfig> = ElementFirstSelector | (ClassListFirstSelectors<Config['classes']>)[number]
type SxRestSelector<Config extends SxConfig> = (ElementRestSelector | (ClassListRestSelectors<Config['classes']>)[number])
type SxSelectorArray<Config extends SxConfig> = [SxFirstSelector<Config>, ...SxRestSelector<Config>[]]

/*****@sx_component_types */
type SxArgs<Config extends SxConfig> = (
  (MuiSxProps<any> | MuiSxProps<any>[] | keyof Config['definitions'] | undefined)[]
)

type SxFunction<Config extends SxConfig> = (
  (...styles: SxArgs<Config>) => MuiSxProps
)

type SxExtensions<Config extends SxConfig> = {
  cls: (className: Config['classes'][number], ...classJoins: SxConfigClass<Config>[]) => `&.${string}`;
  _cls: (className: Config['classes'][number], ...classJoins: SxConfigClass<Config>[]) => `& .${string}`;
  el: (element: ElementFirstSelector, ...elementAdditions: ElementRestSelector[]) => `& ${keyof HTMLElementTagNameMap}${string}`;
  hov: (modifier?: string) => `&${string}:hover`;
  def: (definition: keyof Config['definitions']) => Config['definitions'][typeof definition]
  // sel: (...selectors: SxSelectorArray<Config>) => string;
  // _sel: (...selectors: SxSelectorArray<Config>) => `& ${string}`;
  $: (...selectors:SxSelectorArray<Config>) => string;
  classes: ClassEnums<Config['classes']>;
  definitions: Config['definitions'];
  // '::extend': <ConfigPart extends SxConfigPart>(configuration:ConfigPart) => SxConfigMerge<Config, ConfigPart>
}

type Sx<Config extends SxConfig = any> = (
  SxFunction<Config> & SxExtensions<Config>
)

const isDefinition = <Config extends SxConfig>(config: Config, str: any): str is keyof Config['definitions'] => (
  typeof str === "string" && str in config['definitions']
);
// const isElementSelector = (selector: any): selector is ElementRestSelector => typeof selector === 'string' && letters.includes(selector[0]);
// const isClass = <Config extends SxConfig>(config: Config, cls: any): cls is Config['classes'][number] => (
//   typeof cls === "string" && config.classes.includes(cls)
// );
// const isClassSelector = (selector: any): selector is ClassSelector => typeof selector === 'string' && selector.startsWith('.');

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

function createSxExtensions<Config extends SxConfig>(config: Config): SxExtensions<Config> {
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
    def(definition) {
      const definitions: Config['definitions'] = config.definitions;
      if (!isDefinition(config, definition)) {
        console.warn(`Warning: "${definition.toString()}" is not defined in Muitils SxConfig`);
        return {} as any;
      }
      return definitions[definition];
    },
    $(...selectors) {
      const [firstSelector, ...nextSelectors] = selectors;
      return `${firstSelector} ${nextSelectors.join('')}`
    },
    /* sel(...selectors) {
      const newSelectorsArray: string[] = [];
      let lastSelector: string | null = null;
      for (const rawSelector of selectors) {
        if (typeof rawSelector === 'string') {
          const selector = rawSelector.trim();
          if (rawSelector === ' ') newSelectorsArray.push(rawSelector);
          if (isElementSelector(selector)) {
            if (lastSelector && isElementSelector(lastSelector)) {
              newSelectorsArray.push(' ', selector);
            } else {
              newSelectorsArray.push(selector);
            }
          }
          lastSelector = selector;
        } else {
          console.warn(`Expected selector to be of type "string", recieved "${typeof rawSelector}"`);
        }
      }
      return newSelectorsArray.join('');
    },
    _sel(...selectors) {
      return `& ${this.sel(...selectors)}`
    }, */
    
  }
}


/**@_EXPORT */
export function createSx<Config extends SxConfigPart>(configuration: Config = ({} as Config)): Sx<SxConfigDefault<Config>> {
  const config = createConfig(configuration);
  const sxFunction = createSxFunction(config);
  const sxExtensions = createSxExtensions(config);
  Object.assign(sxFunction, sxExtensions);
  return sxFunction as Sx<SxConfigDefault<Config>>;
}

export function extendSx<SxExtendee, ExtConfig extends SxConfigPart>(
  sx: SxExtendee,
  config: ExtConfig
): SxExtendee extends Sx<infer Config> ? SxConfigMerge<Config, ExtConfig> : never {
  const SX = sx as Sx;
  const CF = { ...DEFAULT_CONFIG, ...config }
  const classes: any = [SX.classes, CF.classes].flat();
  const definitions: any = { ...SX?.definitions, ...CF.definitions };
  return createSx({
    classes,
    definitions
  }) as any
}


// const sx = createSx({
//   classes: <const>['asd','b'],
//   definitions: {
//     w100: {width:'100%'}
//   }
// });

// sx.$()