# useFormContext

This hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the form as a prop.

> NOTE: You need to wrap your form with the FormProvider component for useFormContext to work properly.

This hook will return all the useForm return methods and props.

```javascript
import { useFormContext } from "solid-hook-form";

export const NestedInput = () => {
  const { register } = useFormContext();

  return <input {...register("name")} />;
};
```

## FormProvider

This component will host context object and allow consuming component to subscribe to context and use useForm props and methods.

> NOTE: Avoid using nested FormProvider

| Name | Type   | Description                                |
| :--- | :----- | :----------------------------------------- |
| form | Object | FormProvider requires all useForm methods. |

```javascript
import { useForm, FormProvider } from "solid-hook-form";

export const ExampleForm = () => {
  const form = useForm();

  return (
    <FormProvider form={form}>
      <form>
        <NestedInput />
      </form>
    </FormProvider>
  );
};
```
