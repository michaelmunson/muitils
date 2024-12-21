import React from "react";

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
export function createNestedComponent<T extends React.FC, U extends Record<string, React.FC>>(target: T, source: U): T & U {
  Object.assign(target, source);
  return target as T & U;
}

