import { createMemo } from "solid-js";
import { createStore, produce, reconcile } from "solid-js/store";
import type { DirtyFields } from "../types/dirty";
import type { FormValues } from "../types/form";
import type { Path } from "../types/path";
import { get } from "../utils/get";
import { set } from "../utils/set";

const isSomeFieldDirty = (value: FormValues): boolean => {
  return Object.values(value).some((value) => {
    if (typeof value === "object") {
      return isSomeFieldDirty(value);
    }

    return value;
  });
};

export const createDirtyFields = <F extends FormValues>(defaultValues: F) => {
  const [dirtyFields, setDirtyFields] = createStore<DirtyFields<F>>({});

  const isDirty = createMemo(() => {
    return isSomeFieldDirty(dirtyFields);
  });

  // biome-ignore lint/suspicious/noExplicitAny: value can be any
  const checkDirty = (name: Path<F>, value: any) => {
    const defaultValue = get(defaultValues, name);
    const isDirty = value !== defaultValue;

    setDirtyFields(
      produce((prev) => {
        set(prev, name, isDirty);
      })
    );
  };

  const resetDirty = (keepDirty?: boolean) => {
    if (keepDirty) {
      return;
    }

    setDirtyFields(reconcile({}));
  };

  return { dirtyFields, isDirty, checkDirty, resetDirty };
};
