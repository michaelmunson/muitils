import {formSx} from './Form/config';
import { MuiSxProps, Sx, SxConfigDefault} from './sx/types';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ConfigSx<S extends Record<string, string>> = {
  classes: Record<keyof S, MuiSxProps>,
  inline: MuiSxProps
}

type ConfigTransform = (component:JSX.Element) => JSX.Element

const createConfig = <S extends Record<string, string>>() => ({
  sx:<ConfigSx<S>>{classes: {},inline: {}},
  transform:<ConfigTransform>((component:JSX.Element) : JSX.Element => component)
})

const CONFIG = <const>{
  Form: createConfig<typeof formSx.classes>(),
}

export const getConfig = () => CONFIG;
export const setConfig = (value: DeepPartial<typeof CONFIG>) => {
  function deepMerge<T extends object>(base: T, value: DeepPartial<T>): T {
      const result = { ...base } as T;
      for (const key in value) {
          const baseValue = base[key];
          const updateValue = value[key];
          
          if (baseValue && updateValue && typeof baseValue === 'object' && typeof updateValue === 'object') {
              result[key] = deepMerge(baseValue, updateValue);
          } else if (updateValue !== undefined) {
              result[key] = updateValue as T[typeof key];
          }
      }
      return result;
  }

  Object.assign(CONFIG, deepMerge(CONFIG, value));
}

