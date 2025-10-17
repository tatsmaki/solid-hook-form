# Nested Values

Check full example at [StackBlitz](https://stackblitz.com/edit/solidjs-templates-kxtctw2h?file=src%2Fexample_form%2Fexample_form.tsx).

<p align="center">
  <img width="600" src="_images/nested_values.png" />
</p>

```typescript
import { useForm } from "solid-hook-form";

type ExampleFormValues = {
  user: {
    email: string;
    profile: {
      name: string;
    };
  };
};

export const ExampleForm = () => {
  const form = useForm<ExampleFormValues>({
    defaultValues: {
      user: {
        email: "",
        profile: {
          name: "",
        },
      },
    },
  });
  const { values, register, onSubmit } = form;

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={onSubmit(saveExample)}>
        <input {...register("user.email")} />
        <input {...register("user.profile.name")} />

        <pre>{JSON.stringify(values(), null, 2)}</pre>
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};
```
