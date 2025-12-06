import type { FormValues } from "../types/form";
import { compact, isObject } from "./get";

// biome-ignore lint/suspicious/noExplicitAny: value can be any
const isKey = (value: any) => /^\w*$/.test(value);
const stringToPath = (input: string) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

export const set = (object: FormValues, path: string, value: unknown) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue =
        isObject(objValue) || Array.isArray(objValue)
          ? objValue
          : !Number.isNaN(+tempPath[index + 1])
            ? []
            : {};
    }
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
