const isDateObject = (value: any) => value instanceof Date;
const isNullOrUndefined = (value: any) => value == null;
const isObjectType = (value: any) => typeof value === "object";
export const isObject = (value: any) =>
  !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
export const compact = (value: any) => (Array.isArray(value) ? value.filter(Boolean) : []);
const isUndefined = (val: any) => val === void 0;

export const get = (object: any, path: string, defaultValue?: unknown) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }

  const result = compact(path.split(/[,[\].]+?/)).reduce(
    (result2, key) => (isNullOrUndefined(result2) ? result2 : result2[key]),
    object
  );

  return isUndefined(result) || result === object
    ? isUndefined(object[path])
      ? defaultValue
      : object[path]
    : result;
};
