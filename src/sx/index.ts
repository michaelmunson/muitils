import { SxProps as MuiSxProps, Theme as MuiTheme } from "@mui/material"

const DEFAULT_CONFIG: SxConfig = {
  classes: [] as const,
  definitions: {},
  theme: {},
}

/**@_TYPES */
type CombineArrays<T extends readonly any[], U extends readonly any[]> = readonly [...T, ...U];


const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const cssOperator = <const>['&', ' ', '+', '>', ',', '*', '=', '[', ']'];
type ElementSelector = keyof HTMLElementTagNameMap | `${string}-${string}`;
// type ClassSelector = `.${string}`;
type CSSOperator = (typeof cssOperator)[number];

type ClassList = readonly string[];
type ClassListSelectors<T extends ClassList> = {
  [K in keyof T]: `.${T[K]}`;
};
type ClassEnums<T extends ClassList> = Readonly<{ [K in T[number]]: K }>

type DefinitionValue<Theme extends MuiTheme = any, Args extends any[] = any[]> = MuiSxProps<Theme> | ((...args: Args) => MuiSxProps<Theme>)
type DefinitionRecord<Theme extends MuiTheme = any> = Readonly<Record<string, DefinitionValue<Theme>>>

/*****@sx_config */
type SxConfig<Theme extends MuiTheme = any> = {
  classes: ClassList;
  definitions: DefinitionRecord<Theme>;
  theme: Theme;
}
type SxConfigPart<Theme extends MuiTheme = any> = Partial<SxConfig<Theme>>

type SxConfigDefault<Config extends SxConfigPart<Theme>, Theme extends MuiTheme = any> = SxConfig<Theme> & Config;

type SxConfigMerge<Config extends SxConfig<Theme>, ExtConfig extends SxConfigPart<Theme>, Theme extends MuiTheme = any> = (
  Sx<{
    classes: CombineArrays<Config['classes'], SxConfigDefault<ExtConfig>['classes']>;
    definitions: Config['definitions'] & SxConfigDefault<ExtConfig>['definitions'];
    theme: Config['theme'];
  }>
)

type SxConfigClass<Config extends SxConfig> = Config['classes'][number];
type SxSelectorItem<Config extends SxConfig> = (CSSOperator | ElementSelector | (ClassListSelectors<Config['classes']>)[number])
type SxSelectorArray<Config extends SxConfig> = SxSelectorItem<Config>[];

/*****@sx_component_types */
type SxArgs<Config extends SxConfig<Theme>, Theme extends MuiTheme = any> = (
  (MuiSxProps<Theme> | keyof Config['definitions'] | undefined)[]
)

type SxFunction<Config extends SxConfig<Theme>, Theme extends MuiTheme = any> = (
  (...styles: SxArgs<Config, Theme>) => MuiSxProps<Theme>
)

type SxExtensions<Config extends SxConfig<Theme>, Theme extends MuiTheme = any> = {
  cls: (className: Config['classes'][number], ...classJoins: SxConfigClass<Config>[]) => `&.${string}`;
  _cls: (className: Config['classes'][number], ...classJoins: SxConfigClass<Config>[]) => `& .${string}`;
  el: (element: ElementSelector, ...elementAdditions: ElementSelector[]) => `& ${ElementSelector}${string}`;
  hov: (modifier?: string) => `&${string}:hover`;
  def: <T extends keyof Config['definitions']>(definition: T) => Config['definitions'][T];
  sel: (...selectors: SxSelectorArray<Config>) => string;
  _sel: (...selectors: SxSelectorArray<Config>) => `& ${string}`;
  classes: ClassEnums<Config['classes']>;
  definitions: Config['definitions'];
  theme: Config['theme'];
  colors: Config['theme']['palette'];
  // '::extend': <ConfigPart extends SxConfigPart<Theme>>(configuration:ConfigPart) => SxConfigMerge<Config, ConfigPart, Theme>
}

type Sx<Config extends SxConfig<Theme> = any, Theme extends MuiTheme = any> = (
  SxFunction<Config, Theme> & SxExtensions<Config, Theme>
)

const isDefinition = <Config extends SxConfig>(config: Config, str: any): str is keyof Config['definitions'] => (
  typeof str === "string" && str in config['definitions']
);
const isElementSelector = (selector: any): selector is ElementSelector => typeof selector === 'string' && letters.includes(selector[0]);
// const isClass = <Config extends SxConfig, Theme extends MuiTheme>(config: Config, cls: any): cls is Config['classes'][number] => (
//   typeof cls === "string" && config.classes.includes(cls)
// );
// const isClassSelector = (selector: any): selector is ClassSelector => typeof selector === 'string' && selector.startsWith('.');

/**@_UTILS */
const createConfig = <Theme extends MuiTheme = any>(config:SxConfigPart<Theme>) : SxConfig<Theme> => ({ ...DEFAULT_CONFIG, ...config });

function createSxFunction<Config extends SxConfig<Theme>, Theme extends MuiTheme = any>(config: Config): SxFunction<Config, Theme> {
  const definitions: Config['definitions'] = config.definitions;
  return (...styles) => {
    const muisx: MuiSxProps<Theme> = {};
    for (const style of styles) {
      if (!style) continue;
      if (isDefinition(config, style)) {
        Object.assign(muisx, definitions[style])
      }
    }
    return muisx;
  }
}

function createSxExtensions  <Config extends SxConfig<Theme>, Theme extends MuiTheme = any>(config: Config): SxExtensions<Config, Theme> {
  return <const>{
    classes: config.classes.reduce((p, c) => ({ ...p, [c]: c }), {}) as Readonly<{ [K in Config["classes"][number]]: K; }>,
    definitions: config.definitions,
    theme: config.theme,
    colors: config.theme.palette,
    cls(...className) {
      return `&.${className.join('.')}`;
    },
    _cls(...className) {
      return `& .${className.join(' .')}`;
    },
    el(...elements) {
      return `& ${elements.join(',') as `${ElementSelector}${string}`}`
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
    sel(...selectors) {
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
    }
  }
}


/**@_EXPORT */
export function createSx<Config extends SxConfigPart<Theme>, Theme extends MuiTheme = any>(configuration: Config=({} as Config)): Sx<SxConfigDefault<Config, Theme>, Theme> {
  const config = createConfig(configuration);
  const sxFunction = createSxFunction(config);
  const sxExtensions = createSxExtensions(config);
  Object.assign(sxFunction, sxExtensions);
  return sxFunction as Sx<SxConfigDefault<Config, Theme>, Theme>;
}

export function extendSx<SxExtendee, ExtConfig extends SxConfigPart<Theme>, Theme extends MuiTheme>(
  sx: SxExtendee,
  config: ExtConfig
): SxExtendee extends Sx<infer Config> ? SxConfigMerge<Config, ExtConfig> : never {
  const SX = sx as Sx;
  const CF = {...DEFAULT_CONFIG, ...config}
  const classes:any = [SX.classes, CF.classes].flat();
  const definitions:any = {...SX?.definitions, ...CF.definitions};
  const theme:any = {...SX?.theme, ...CF.theme}
  return createSx({
    classes,
    definitions,
    theme,
  }) as any
}
