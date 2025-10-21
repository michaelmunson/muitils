import React from "react";


export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * @importing
 * ```tsx
 * import {createNestedComponent} from 'muitils'
 * ```
 * @example
 * ```tsx 
  const ChildComponent1 = () => <div>ChildComponent1</div>;
  const ChildComponent2 = () => <div>ChildComponent2</div>;

  const NestedComponent = createNestedComponent(
    function ({children}: {children: React.ReactNode}) {
      return <div>{children}</div>
    }, {
    ChildComponent1,
    ChildComponent2
  });

  function ExampleUsage() {
    return (
      <NestedComponent>
        <NestedComponent.ChildComponent1 />
        <NestedComponent.ChildComponent2 />
      </NestedComponent>
    )
  }
 * ```
 */
export function createdNestedComponent<T extends React.FC<any>, U extends Record<string, React.FC<any>>>(target: T, source: U): T & U {
  Object.assign(target, source);
  return target as T & U;
}

export function deepMerge<T extends object>(base: T, value: DeepPartial<T>): T {
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