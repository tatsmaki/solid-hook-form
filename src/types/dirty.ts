import { FormValues } from "./form";
import { Path } from "./path";

export type DirtyFields<F extends FormValues = FormValues> = Partial<Record<Path<F>, boolean>>;
