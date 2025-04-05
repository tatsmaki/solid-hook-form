export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export type BrowserNativeObject = Date | FileList | File;

export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type Merge<A, B> = {
  [K in keyof A | keyof B]?: K extends keyof A & keyof B
    ? [A[K], B[K]] extends [object, object]
      ? Merge<A[K], B[K]>
      : A[K] | B[K]
    : K extends keyof A
    ? A[K]
    : K extends keyof B
    ? B[K]
    : never;
};

export type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;

export type LiteralUnion<T extends U, U extends Primitive> =
  | T
  | (U & {
      _?: never;
    });
