import { FormValues } from "./form";
import { Path } from "./path";

export type TouchedFields<F extends FormValues = FormValues> = Partial<Record<Path<F>, boolean>>;
