# Validation

Check full example at [StackBlitz](https://stackblitz.com/edit/solidjs-templates-lf7zsywk?file=src%2Fexample_form%2Fexample_form.tsx).

<p align="center">
  <img width="600" src="_images/validation.png" />
</p>

```typescript
import { useForm } from "solid-hook-form";

type ExampleFormValues = {
  email: string;
};

export const ExampleForm = () => {
  const form = useForm<ExampleFormValues>({
    defaultValues: {
      email: "",
    },
  });
  const { errors, register, onSubmit } = form;

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={onSubmit(saveExample)}>
        <input
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          aria-invalid={Boolean(errors().email)}
        />
        {errors().email && <p role="alert">{errors().email.message}</p>}

        <pre>{JSON.stringify(errors(), null, 2)}</pre>
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};
```
