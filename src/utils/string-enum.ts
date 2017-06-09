/* https://basarat.gitbooks.io/typescript/docs/types/literal-types.html */
export function stringEnum<T extends string>(o: T[]): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}
