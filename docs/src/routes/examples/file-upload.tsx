import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Image } from "~/components/image/image";

const FileUpload = () => {
  return (
    <main>
      <Container>
        <h1>File Upload</h1>

        <p>
          Check full example at{" "}
          <Link
            href="https://stackblitz.com/edit/solidjs-templates-jhhjanak?file=src%2Fexample_form%2Fexample_form.tsx"
            target="_blank"
            color="accent"
          >
            StackBlitz
          </Link>
          .
        </p>

        <Image src="/file_upload.png" />

        <Code language="ts">
          {`import { useForm, FormProvider } from "solid-hook-form";
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
};`}
        </Code>
      </Container>
    </main>
  );
};

export default FileUpload;
