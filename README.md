# Solid Hook Form

[<img width="1171" alt="Screenshot 2025-04-05 at 15 01 47" src="https://github.com/tatsmaki/solid-hook-form/blob/master/assets/demo.png" />](https://tatsmaki.github.io/solid-hook-form)

<p align="center">
  <a href="https://tatsmaki.github.io/solid-hook-form/#/quickstart">Get started</a> | 
  <a href="https://solid-hook-form.vercel.app/">Playground</a> 
</p>

### Features

- Embraces native HTML form [validation](https://tatsmaki.github.io/solid-hook-form/#/quickstart?id=apply-validation)
- [Small size](https://bundlephobia.com/package/solid-hook-form@latest) and no [dependencies](./package.json)
- TypeScript [support](https://tatsmaki.github.io/solid-hook-form/#/quickstart?id=typescript)

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
