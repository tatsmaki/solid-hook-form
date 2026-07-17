import { createStore, produce, reconcile } from "solid-js/store";
import type { FormValues } from "../types/form";
import type { Path } from "../types/path";
import type { TouchedFields } from "../types/touched";
import { set } from "../utils/set";

export const createTouchedFields = <F extends FormValues>() => {
  const [touchedFields, setTouchedFields] = createStore<TouchedFields<F>>({});

  const addTouched = (name: Path<F>) => {
    setTouchedFields(
      produce((prev) => {
        set(prev, name, true);
      })
    );
  };

  const resetTouched = (keepTouched?: boolean) => {
    if (keepTouched) {
      return;
    }

    setTouchedFields(reconcile({}));
  };

  return { touchedFields, addTouched, resetTouched };
};
