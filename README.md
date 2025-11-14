# Solid Hook Form

[<img width="985" height="254" alt="placeholder" src="/assets/placeholder.png" />](https://solid-hook-form.vercel.app)

<p align="center">
  <a href="https://solid-hook-form.vercel.app/get-started">Get started</a> | 
  <a href="https://solid-hook-form.vercel.app/#playground">Playground</a> |
  <a href="https://solid-hook-form.vercel.app/examples">Examples</a> 
</p>

### Features

- Embraces native HTML form [validation](https://solid-hook-form.vercel.app/get-started#apply-validation)
- [Small size](https://bundlephobia.com/package/solid-hook-form@latest) and no [dependencies](./package.json)
- TypeScript [support](https://solid-hook-form.vercel.app/get-started#typescript)
- Supports [Yup](https://github.com/jquense/yup), [Zod](https://github.com/colinhacks/zod), [Joi](https://github.com/hapijs/joi) and other [@hookform/resolvers](https://github.com/react-hook-form/resolvers) schema validation integrations.

### Install

```sh
npm install solid-hook-form
```

### Quick start

```jsx
import { useForm } from "solid-hook-form";

const ExampleForm = () => {
  const { errors, register, onSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const submitExample = (values) => console.log(values);

  return (
    <form onSubmit={onSubmit(submitExample)}>
      <input {...register("name", { minLength: 2, pattern: /[A-Za-z]/ })} />;
      <button type="submit">Submit</button>
    </form>
  );
};
```
