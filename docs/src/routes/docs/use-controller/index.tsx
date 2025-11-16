import { Title } from "@solidjs/meta";
import { createMemo } from "solid-js";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const UseController = () => {
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
      <Title>UseController</Title>

      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>UseController</h1>

          <p>
            This custom hook powers <Link href="/docs/use-controller/controller">Controller</Link>.
            Additionally, it shares the same props and methods as Controller. It's useful for
            creating reusable Controlled input.
          </p>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <p>The following table contains information about the arguments for useController.</p>

          <Table>
            {[
              ["Name", "Type", "Description"],
              [
                "control",
                "Object",
                "control object is from invoking createForm. Optional when using FormProvider.",
              ],
              ["name", "string", "Unique name of your input."],
              ["rules", "Object", rulesDescription()],
            ]}
          </Table>

          <p style={{ "margin-bottom": 0 }}>Returns</p>
          <hr />

          <p>
            The following table contains information about properties which useController produces.
          </p>

          <Table>
            {[
              ["Name", "Type", "Description"],
              [
                "field.value",
                "Accessor",
                "Signal to retrieve the current value of the controlled component.",
              ],
              ["field.name", "string", "Input's name being registered."],
              [
                "field.onInput",
                "Function",
                "A function which sends the input's value to the library.",
              ],
              [
                "field.onChange",
                "Function",
                "A function which sends the input's value to the library.",
              ],
              [
                "field.ref",
                "Function",
                "A ref used to connect hook form to the input. Assign ref to component's input ref to allow hook form to focus the error input.",
              ],
              [
                "fieldState.error",
                "Accessor",
                "Signal to retrieve the error for this specific input.",
              ],
            ]}
          </Table>

          <p>Using Hooks API</p>

          <Code language="js">
            {`import { TextField } from "@kobalte/core/text-field"
import { createForm, useController } from "solid-hook-form"

const ControlledInput = (props) => {
  const { field, fieldState } = useController({
    control: props.control,
    name: "firstName",
    rules: { required: true }
  })

  return (
    <TextField>
      <TextField.Label>Field</TextField.Label>
      <TextField.Input
        {...field}
        value={field.value()}
        validationState={fieldState.error() ? "invalid" : "valid"}
      />
    </TextField>
  )
}

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      firstName: ""
    },
    mode: "onChange"
  })
  const { control, handleSubmit } = form

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput control={control} />
      <button type="submit">Save</button>
    </form>
  )
}`}
          </Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default UseController;
