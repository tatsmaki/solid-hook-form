import { Title } from "@solidjs/meta";
import { createMemo } from "solid-js";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const Controller = () => {
  const renderDescription = createMemo(() => {
    return (
      <>
        This is a render prop. A function that returns an element and provides the ability to attach
        events and value into the component. This simplifies integrating with external controlled
        components with non-standard prop names.
        <br />
        Provides onInput, onChange, name, ref and value to the child component, and also a fieldState
        object which contains specific input state.
      </>
    );
  });

  const rulesDescription = createMemo(() => {
    return (
      <>
        Validation rules in the same format for{" "}
        <Link href="/docs/create-form/register#rules">register options</Link>, which includes:
        required, min, max, minLength, maxLength, pattern, validate
      </>
    );
  });

  return (
    <main>
      <Title>Controller</Title>

      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>Controller</h1>

          <p>
            Solid Hook Form embraces uncontrolled components and native inputs, however it's hard to
            avoid working with external controlled component such as{" "}
            <Link href="https://kobalte.dev" target="_blank">
              Kobalte
            </Link>
            . This wrapper component will make it easier for you to work with it.
          </p>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <p>The following table contains information about the arguments for Controller.</p>

          <Table>
            {[
              ["Name", "Type", "Description"],
              [
                "control",
                "Object",
                "control object is from invoking createForm. Optional when using FormProvider.",
              ],
              ["name", "string", "Unique name of your input."],
              ["render", "Function", renderDescription()],
              ["rules", "Object", rulesDescription()],
            ]}
          </Table>

          <p>Using Component API</p>

          <Code language="js">{`import { TextField } from "@kobalte/core/text-field"
import { createForm, Controller } from "solid-hook-form"

export const ExampleForm = () => {
  const { control, handleSubmit } = createForm({
    defaultValues: {
      field: ""
    }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller 
        control={control}
        name="field"
        render={({ field, fieldState }) => (
          <TextField>
            <TextField.Label>Field</TextField.Label>
            <TextField.Input
              name={field.name}
              ref={field.ref}
              value={field.value()}
              onChange={field.onChange}
              validationState={fieldState.error() ? "invalid" : "valid"}
            />
            <TextField.ErrorMessage>{fieldState.error()?.message}</TextField.ErrorMessage>
          </TextField>
        )}
        rules={{
          minLength: { value: 5, message: "Min 5" }
        }}
      />
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Controller;
