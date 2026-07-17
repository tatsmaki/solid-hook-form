import { createMemo, createSignal } from "solid-js";
import { createStore, produce, reconcile } from "solid-js/store";
import type { DirtyFields } from "../types/dirty";
import type { FormValues } from "../types/form";
import type { Path } from "../types/path";
import { get } from "../utils/get";
import { set } from "../utils/set";

export const createDirtyFields = <F extends FormValues>(defaultValues: F) => {
  const [dirtyFields, setDirtyFields] = createStore<DirtyFields<F>>({});
  const [dirtyCount, setDirtyCount] = createSignal(0);

  const isDirty = createMemo(() => dirtyCount() > 0);

  // biome-ignore lint/suspicious/noExplicitAny: value can be any
  const checkDirty = (name: Path<F>, value: any) => {
    const defaultValue = get(defaultValues, name);
    const nextDirty = value !== defaultValue;
    const prevDirty = Boolean(get(dirtyFields, name));

    if (prevDirty === nextDirty) {
      return;
    }

    setDirtyCount((count) => count + (nextDirty ? 1 : -1));
    setDirtyFields(
      produce((prev) => {
        set(prev, name, nextDirty);
      })
    );
  };

  const resetDirty = (keepDirty?: boolean) => {
    if (keepDirty) {
      return;
    }

    setDirtyCount(0);
    setDirtyFields(reconcile({}));
  };

  return { dirtyFields, isDirty, checkDirty, resetDirty };
};
