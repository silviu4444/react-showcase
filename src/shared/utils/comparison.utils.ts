export function hasObjectChanged<T extends Record<string, any>>(
  previous: T | null,
  current: T
): boolean {
  if (!previous) {
    return true;
  }

  const currentKeys = Object.keys(current) as Array<keyof T>;

  for (const key of currentKeys) {
    if (previous[key] !== current[key]) {
      return true;
    }
  }

  return false;
}
