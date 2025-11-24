import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const Provider = () => {
  return (
    <main>
      <Title>FormProvider</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>FormProvider</h1>

          <p>
            This component will host context object and allow consuming component to subscribe to
            context and use createForm props and methods.
          </p>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["form", "UseFormReturn", "FormProvider requires all createForm methods."],
            ]}
          </Table>

          <blockquote>
            <p>Avoid using nested FormProvider</p>
          </blockquote>

          <Code language="js">{`import { createForm, FormProvider } from "solid-hook-form"

export const ExampleForm = () => {
    const form = createForm({
      defaultValues: {
        nested: ""
      }
    })
    const { handleSubmit } = form

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <FormProvider form={form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <NestedInput />
                <button type="submit">Save</button>
            </form>
        </FormProvider>
    )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Provider;
