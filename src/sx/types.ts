import { type SxProps as MuiSxProps } from "@mui/material";

// Utility type to convert union to intersection
type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;


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

type SxConfig<S extends SxConfigPart = object> = {
  classes: S['classes'] extends ClassList ? S['classes'] : ClassList;
  definitions: S['definitions'] extends DefinitionRecord ? S['definitions'] : DefinitionRecord;
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
type SxSelectorRecord<Config extends SxConfig> = {
  [K in SxSelectorArray<Config>[number]]: (MuiSxProps<any> | SxSelectorRecord<Config>)
}

type SxArgs<Config extends SxConfig> = (
  (
    MuiSxProps<any> | 
    MuiSxProps<any>[] | 
    keyof Config['definitions'] | 
    SxSelectorRecord<Config> |
    undefined
  )[]
)

type SxFunction<Config extends SxConfig> = (
  (...styles: SxArgs<Config>) => MuiSxProps
)

type SxExtensions<Config extends SxConfig> = {
  /**@description Creates a class selector */
  cls: (className: Config['classes'][number], ...classJoins: SxConfigClass<Config>[]) => `&.${string}`;
  /**@description Creates a class selector with a dot prefix */
  _cls: (className: Config['classes'][number], ...classJoins: SxConfigClass<Config>[]) => `& .${string}`;
  /**@description Creates an element selector */
  el: (element: ElementFirstSelector, ...elementAdditions: ElementRestSelector[]) => `& ${keyof HTMLElementTagNameMap}${string}`;
  /**@description Creates a hover selector */
  hov: (modifier?: string) => `&${string}:hover`;
  /**@description merges the definitions of the provided keys */
  def: <D extends (keyof Config['definitions'])[]>(...definition: D) => UnionToIntersection<{[K in D[number]]: Config['definitions'][K]}[D[number]]>;
  /**@description Creates a selector string from an array of provided selectors */
  $: (...selectors:SxSelectorArray<Config>) => string;
  /**@description class enum */
  classes: ClassEnums<Config['classes']>;
  /**@description definition enum */
  definitions: Config['definitions'];
}


type Sx<Config extends SxConfig = any> = (
  SxFunction<Config> & SxExtensions<Config>
)

type ExtractSxConfig<S> = S extends Sx<infer Config> ? Config : never;
type ExtractSxRecord<S> = S extends Sx<infer Config> ? (SxSelectorRecord<Config> & MuiSxProps) : MuiSxProps;

export type {
  Sx,
  SxConfig,
  SxConfigPart,
  SxConfigDefault,
  SxConfigMerge,
  SxFunction,
  SxExtensions,
  SxArgs,
  MuiSxProps,
  ExtractSxConfig,
  ExtractSxRecord
}
