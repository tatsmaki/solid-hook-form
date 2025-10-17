# File Upload

Check full example at [StackBlitz](https://stackblitz.com/edit/solidjs-templates-jhhjanak?file=src%2Fexample_form%2Fexample_form.tsx).

<p align="center">
  <img width="600" src="_images/file_upload.png" />
</p>

```typescript
import { useForm, FormProvider } from "solid-hook-form";
import { FileUpload } from "./file_upload";

type ExampleFormValues = {
  documents: Blob[];
};

export const ExampleForm = () => {
  const form = useForm<ExampleFormValues>({
    defaultValues: {
      documents: [],
    },
  });
  const { register, onSubmit } = form;

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={onSubmit(saveExample)}>
        <FileUpload {...register("documents")} label="Documents" multiple accept="image/*,.pdf" />
      </form>
    </FormProvider>
  );
};
```
