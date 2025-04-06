# Solid Hook Form

### Playground

[<img width="1171" alt="Screenshot 2025-04-05 at 15 01 47" src="https://github.com/tatsmaki/solid-hook-form/blob/master/assets/demo.png" />](https://solid-hook-form.vercel.app/)

### Install

```sh
npm install solid-hook-form
```

### Quickstart

```tsx
import { useForm } from "solid-hook-form";

const Form = () => {
  const { errors, isValid, register, onSubmit } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      email: "",
      password: "",
      age: 0,
      remember: false,
    },
  });

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <input type="date" {...register("date", { required: "Required" })} />;
      <input
        {...register("email", {
          required: "Required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email",
          },
        })}
      />
      <input
        {...register("password", {
          required: "Required",
          minLength: { value: 8, message: "Min 8" },
        })}
      />
      <input type="number" {...register("age", { min: 18, max: 100 })} />
      <input type="checkbox" {...register("remember", { required: "Required" })} />
      <button type="submit">Submit</button>
    </form>
  );
};
```
