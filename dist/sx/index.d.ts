import { SxProps as MuiSxProps, Theme as MuiTheme } from "@mui/material";
/**@_TYPES */
type CombineArrays<T extends readonly any[], U extends readonly any[]> = readonly [...T, ...U];
declare const cssOperator: readonly ["&", " ", "+", ">", ",", "*", "=", "[", "]"];
type ElementSelector = keyof HTMLElementTagNameMap | `${string}-${string}`;
type CSSOperator = (typeof cssOperator)[number];
type ClassList = readonly string[];
type ClassListSelectors<T extends ClassList> = {
    [K in keyof T]: `.${T[K]}`;
};
type ClassEnums<T extends ClassList> = Readonly<{
    [K in T[number]]: K;
}>;
type DefinitionValue<Theme extends MuiTheme = any, Args extends any[] = any[]> = MuiSxProps<Theme> | ((...args: Args) => MuiSxProps<Theme>);
type DefinitionRecord<Theme extends MuiTheme = any> = Readonly<Record<string, DefinitionValue<Theme>>>;
/*****@sx_config */
type SxConfig<Theme extends MuiTheme = any> = {
    classes: ClassList;
    definitions: DefinitionRecord<Theme>;
    theme: Theme;
};
type SxConfigPart<Theme extends MuiTheme = any> = Partial<SxConfig<Theme>>;
type SxConfigDefault<Config extends SxConfigPart<Theme>, Theme extends MuiTheme = any> = SxConfig<Theme> & Config;
type SxConfigMerge<Config extends SxConfig<Theme>, ExtConfig extends SxConfigPart<Theme>, Theme extends MuiTheme = any> = (Sx<{
    classes: CombineArrays<Config['classes'], SxConfigDefault<ExtConfig>['classes']>;
    definitions: Config['definitions'] & SxConfigDefault<ExtConfig>['definitions'];
    theme: Config['theme'];
}>);
type SxConfigClass<Config extends SxConfig> = Config['classes'][number];
type SxSelectorItem<Config extends SxConfig> = (CSSOperator | ElementSelector | (ClassListSelectors<Config['classes']>)[number]);
type SxSelectorArray<Config extends SxConfig> = SxSelectorItem<Config>[];
/*****@sx_component_types */
type SxArgs<Config extends SxConfig<Theme>, Theme extends MuiTheme = any> = ((MuiSxProps<Theme> | keyof Config['definitions'] | undefined)[]);
type SxFunction<Config extends SxConfig<Theme>, Theme extends MuiTheme = any> = ((...styles: SxArgs<Config, Theme>) => MuiSxProps<Theme>);
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
};
type Sx<Config extends SxConfig<Theme> = any, Theme extends MuiTheme = any> = (SxFunction<Config, Theme> & SxExtensions<Config, Theme>);
/**@_EXPORT */
export declare function createSx<Config extends SxConfigPart<Theme>, Theme extends MuiTheme = any>(configuration?: Config): Sx<SxConfigDefault<Config, Theme>, Theme>;
export declare function extendSx<SxExtendee, ExtConfig extends SxConfigPart<Theme>, Theme extends MuiTheme>(sx: SxExtendee, config: ExtConfig): SxExtendee extends Sx<infer Config> ? SxConfigMerge<Config, ExtConfig> : never;
export {};
