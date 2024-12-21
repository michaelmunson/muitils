export function deepMerge<T>(base: T, value: T): T {
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

export function shallowMerge<T>(base: T, value: T): T {
  return { ...base, ...value };
}