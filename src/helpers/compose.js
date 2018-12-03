export const compose = (...fns) => val => fns.reduce((result, fn) => fn(result), val)
