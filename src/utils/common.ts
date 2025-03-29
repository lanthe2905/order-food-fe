export function deepClone<T>(obj: T): T | null {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  }

  return null;
}
