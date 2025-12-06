import type { FormValues } from "./form";
import type { Path } from "./path";

export type TouchedFields<F extends FormValues = FormValues> = Partial<Record<Path<F>, boolean>>;
