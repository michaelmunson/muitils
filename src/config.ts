import { CrumbsProps } from './Crumbs/types';
import crumbsSx from './Crumbs/sx';
import formSx from './Form/sx';
import { FormProps } from './Form/types';
import tableSx from './Table/sx';
import { TableProps } from './Table/types';
import { ExtractSxRecord} from './sx/types';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ConfigSx<S> = ExtractSxRecord<S>;
type ConfigProps<P extends Record<string, any>> = Partial<P>;
type ConfigTransform = (component:JSX.Element) => JSX.Element

const createConfig = <T extends {sx:S, props:P}, S extends ConfigSx<any> = any, P extends Record<string, any> = any>() => ({
  /**
   * @description Global sx modifier
   */
  sx:<ConfigSx<T['sx']>>{},
  /**
   * @description Global props modifier
   */
  props:<ConfigProps<T['props']>>{},
  /**
   * @description Global transform function
   * @example
   * ```tsx
   * (component:JSX.Element) => component
   * ```
   */
  transform:<ConfigTransform>((component:JSX.Element) : JSX.Element => component)
})

const CONFIG = <const>{
  Form: createConfig<{sx:typeof formSx, props:FormProps<any>}>(),
  Table: createConfig<{sx:typeof tableSx, props:TableProps}>(),
  Crumbs: createConfig<{sx:typeof crumbsSx, props:CrumbsProps}>(),
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