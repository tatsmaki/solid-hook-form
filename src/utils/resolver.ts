import type { Field, Ref } from "react-hook-form";
import type { FormFields } from "../types/form";

type ResolverFields = Record<string, Field["_f"]>;

export const getResolverFields = (fields: FormFields) => {
  return Object.entries(fields).reduce<ResolverFields>((acc, [name, ref]) => {
    acc[name] = {
      ref: ref as Ref,
      name
    };

    return acc;
  }, {});
};
