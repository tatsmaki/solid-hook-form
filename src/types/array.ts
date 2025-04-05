export type ArrayKey = number;

export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

export type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"] ? false : true;
