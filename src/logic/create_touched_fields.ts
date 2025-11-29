import { createSignal } from "solid-js";
import { FormValues } from "../types/form";
import { set } from "../utils/set";
import { Path } from "../types/path";
import { TouchedFields } from "../types/touched";

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
