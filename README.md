# Solid Hook Form

[<img width="1291" height="834" alt="Screenshot 2025-10-17 at 02 07 00" src="https://github.com/user-attachments/assets/83ec4c9a-60e1-49be-9415-8f8b2df74d53" />](https://solid-hook-form.vercel.app)

<p align="center">
  <a href="https://solid-hook-form.vercel.app/#/quickstart">Get started</a> | 
  <a href="https://solid-hook-form-playground.vercel.app">Playground</a> 
</p>

### Features

- Embraces native HTML form [validation](https://solid-hook-form.vercel.app/#/quickstart?id=apply-validation)
- [Small size](https://bundlephobia.com/package/solid-hook-form@latest) and no [dependencies](./package.json)
- TypeScript [support](https://solid-hook-form.vercel.app/#/quickstart?id=typescript)

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
