import formSx from './Form/sx';
import tableSx from './Table/sx';
import { ExtractSxRecord} from './sx/types';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ConfigSx<S> = ExtractSxRecord<S>;

type ConfigTransform = (component:JSX.Element) => JSX.Element

const createConfig = <S>() => ({
  sx:<ConfigSx<S>>{},
  transform:<ConfigTransform>((component:JSX.Element) : JSX.Element => component)
})

const CONFIG = <const>{
  Form: createConfig<typeof formSx>(),
  Table: createConfig<typeof tableSx>(),
}

/**
 * @description Returns the current configuration
 */
export const getConfig = () => CONFIG;

/**
 * @description Sets the configuration
 */
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
