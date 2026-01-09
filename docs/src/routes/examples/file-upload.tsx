import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";
import { StackBlitzPreview } from "~/components/stackblitz-preview/stackblitz-preview";

const stackblitzUrl =
  "https://stackblitz.com/edit/solidjs-templates-jhhjanak?file=src%2Fexample_form%2Fexample_form.tsx";

const FileUpload = () => {
  return (
    <main>
      <Title>File Upload</Title>
      <Container.Grid>
        <ExamplesNavigation />

        <Container.Content>
          <h1>File Upload</h1>

          <p>Control documents upload using native file input.</p>

          <p>
            Check full example at{" "}
            <Link href={stackblitzUrl} target="_blank" color="accent">
              StackBlitz
            </Link>
            .
          </p>

          <StackBlitzPreview src={stackblitzUrl} title="File Upload" />

          <Code language="ts">
            {`import { createForm, FormProvider } from "solid-hook-form";
import { FileUpload } from "./file_upload";

type ExampleFormValues = {
  documents: Blob[];
};

export const ExampleForm = () => {
  const form = createForm<ExampleFormValues>({
    defaultValues: {
      documents: [],
    },
  });
  const { register, handleSubmit } = form;

  const onSubmit = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FileUpload {...register("documents")} label="Documents" multiple accept="image/*,.pdf" />
      </form>
    </FormProvider>
  );
};`}
          </Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default FileUpload;
