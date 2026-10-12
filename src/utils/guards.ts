// Type guards for answers of Ecotrip CMS: a CMS answer of an unexpected shape
// is treated as a failed request, so the form falls back to the snapshot
// instead of crashing.
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

// null or undefined, or a value the guard accepts.
export const isOptional =
  <T>(guard: (value: unknown) => value is T) =>
  (value: unknown): value is T | null | undefined =>
    value === null || value === undefined || guard(value);

export const isArrayOf =
  <T>(guard: (value: unknown) => value is T) =>
  (value: unknown): value is T[] =>
    Array.isArray(value) && value.every(guard);
