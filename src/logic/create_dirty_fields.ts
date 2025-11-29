import { createMemo, createSignal } from "solid-js";
import { FormValues } from "../types/form";
import { set } from "../utils/set";
import { get } from "../utils/get";
import { Path } from "../types/path";
import { DirtyFields } from "../types/dirty";

const isSomeFieldDirty = (value: Record<string, any>): boolean => {
  return Object.values(value).some((value) => {
    if (typeof value === "object") {
      return isSomeFieldDirty(value);
    }

    return value;
  });
};

export const createDirtyFields = <F extends FormValues>(defaultValues: F) => {
  const [dirtyFields, setDirtyFields] = createSignal<DirtyFields<F>>({});

  const isDirty = createMemo(() => {
    return isSomeFieldDirty(dirtyFields());
  });

  const checkDirty = (name: Path<F>, value: any) => {
    const defaultValue = get(defaultValues, name);
    const isDirty = value !== defaultValue;

    setDirtyFields((prev) => {
      const newState = { ...prev };

      set(newState, name, isDirty);

      return newState;
    });
  };

  const resetDirty = (keepDirty?: boolean) => {
    if (keepDirty) {
      return;
    }

    setDirtyFields({});
  };

  return { dirtyFields, isDirty, checkDirty, resetDirty };
};
