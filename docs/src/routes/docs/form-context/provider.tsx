import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Table } from "~/components/table/table";

const Provider = () => {
  return (
    <main>
      <Title>FormProvider</Title>
      <Container>
        <h1>FormProvider</h1>

        <p>
          This component will host context object and allow consuming component to subscribe to
          context and use useForm props and methods.
        </p>

        <p style={{ "margin-bottom": 0 }}>Props</p>
        <hr />

        <Table>
          {[
            ["Name", "Type", "Description"],
            ["form", "UseFormReturn", "FormProvider requires all useForm methods."],
          ]}
        </Table>

        <blockquote>
          <p>Avoid using nested FormProvider</p>
        </blockquote>

        <Code language="js">{`import { useForm, FormProvider } from "solid-hook-form";

export const ExampleForm = () => {
    const form = useForm();
    const { onSubmit } = form;

    const onSave = (values) => {
        console.log(values);
    };

    return (
        <FormProvider form={form}>
            <form onSubmit={onSubmit(onSave)}>
                <NestedInput />
                <button type="submit">Save</button>
            </form>
        </FormProvider>
    );
};`}</Code>
      </Container>
    </main>
  );
};

export default Provider;
