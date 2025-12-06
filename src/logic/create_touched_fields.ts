import { createSignal } from "solid-js";
import type { FormValues } from "../types/form";
import type { Path } from "../types/path";
import type { TouchedFields } from "../types/touched";
import { set } from "../utils/set";

export const createTouchedFields = <F extends FormValues>() => {
  const [touchedFields, setTouchedFields] = createSignal<TouchedFields<F>>({});

  const addTouched = (name: Path<F>) => {
    setTouchedFields((prev) => {
      const newState = { ...prev };

      set(newState, name, true);

      return newState;
    });
  };

  const resetTouched = (keepTouched?: boolean) => {
    if (keepTouched) {
      return;
    }

    setTouchedFields({});
  };

  return { touchedFields, addTouched, resetTouched };
};
