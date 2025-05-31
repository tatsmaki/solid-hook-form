# Quick start

## Install

Install solid-hook-form package.

```bash
npm install solid-hook-form
```

## Example

The following code demonstrates a basic usage example.

```javascript
import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, onSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name")} />
      <button type="submit">Save</button>
    </form>
  );
};
```

## Register fields

To make field value available for form validation and submission you need to register your component into the hook.

> Note: form field name should match a registered component name.

```javascript
import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, onSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="checkbox" {...register("agree")}>
      <button type="submit">Save</button>
    </form>
  );
};
```

## Apply validation

Solid Hook Form makes form validation easy by aligning with the existing [HTML standard for form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation).

List of validation rules supported:

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

```javascript
import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, onSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name", { minLength: 2, pattern: /[A-Za-z]/ })} />
      <input type="email" {...register("email", { maxLength: 254 })} />
      <input type="checkbox" {...register("agree", { required: true })}>
      <button type="submit">Save</button>
    </form>
  );
};
```

## TypeScript

Solid Hook Form is built with TypeScript, and you can define a FormValues type.

```typescript
import { useForm } from "solid-hook-form";

type ExampleFormValues = {
  name: string;
  email: string;
  agree: boolean
};

export const ExampleForm = () => {
  const { register, onSubmit } = useForm<ExampleFormValues>({
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  });

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="checkbox" {...register("agree")}>
      <button type="submit">Save</button>
    </form>
  );
};
```
